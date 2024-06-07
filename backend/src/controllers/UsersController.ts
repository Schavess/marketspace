import { hash, compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { prisma } from "../database";
import { DiskStorage } from "../providers/DiskStorage";

export class UsersController {
  async show(request: Request, response: Response) {
    const userId = request.user.id

    const user = await prisma.users.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        avatar: true,
        name: true,
        email: true,
        tel: true
      }
    })

    if (!user) {
      throw new AppError('O usuário não foi encontrado.', 404)
    }

    return response.json(user)
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, password, tel } = request.body;
    const avatarFile = request.file;
    const diskStorage = new DiskStorage();

    if (!avatarFile) {
      throw new AppError("É obrigatório o envio de uma imagem.")
    }

    if (!name || !email || !password || !tel) {
      await diskStorage.deleteFile(avatarFile.path)
      throw new AppError("Informe todos os campos de texto (nome, email, telefone e senha).");
    }
    
    const checkUserEmailExists = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (checkUserEmailExists) {
      await diskStorage.deleteFile(avatarFile.path)
      throw new AppError("Este e-mail já está em uso.", 401);
    }

    const checkUserTelExists = await prisma.users.findUnique({
      where: {
        tel
      }
    })

    if (checkUserTelExists) {
      await diskStorage.deleteFile(avatarFile.path)
      throw new AppError("Este telefone já está em uso.", 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        tel,
        password: hashedPassword
      }
    });

    request.user = {
      id: user.id,
    };

    return next();
  }

  async update(request: Request, response: Response) {
    const userId = request.user.id;
    const { name, email, oldpassword, password, tel } = request.body;
    const avatarFile = request.file;
    const diskStorage = new DiskStorage();

    const user = await prisma.users.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (!oldpassword) {
      throw new AppError("Senha antiga necessária.", 401);
    }

    if (oldpassword) {
      const passwordMatched = await compare(oldpassword, user.password);

      if (!passwordMatched) {
        throw new AppError("Senha incorreta.", 401);
      }
    }


    if (email) {
      const checkUserEmailExists = await prisma.users.findUnique({
        where: {
          email
        }
      });

      if (checkUserEmailExists && checkUserEmailExists.id !== userId) {
        throw new AppError("Este e-mail já está em uso.", 401);
      }
    }

    if (tel) {
      const checkUserTelExists = await prisma.users.findUnique({
        where: {
          tel
        }
      });

      if (checkUserTelExists && checkUserTelExists.id !== userId) {
        throw new AppError("Este telefone já está em uso.", 401);
      }
    }
    
    if (password) {
      user.password = await hash(password, 8);
    }

    if (avatarFile) {
      if (user.avatar) {
        await diskStorage.deleteFile(user.avatar);
      }
      const filename = await diskStorage.saveFile(avatarFile.filename);
      user.avatar = filename;
    }

    const userUpdated = await prisma.users.update({
      where: { id: userId },
      data: {
        name: name ?? user.name,
        email: email ?? user.email,
        tel: tel ?? user.tel,
        password: user.password,
        avatar: user.avatar,
      }
    });

    const responseData = {
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
      tel: userUpdated.tel,
      avatar: userUpdated.avatar,
    }

    return response.status(200).json(responseData);
  }

}