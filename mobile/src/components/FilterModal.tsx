import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Checkbox, Switch, VStack, HStack, Text, Center } from 'native-base';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

type PaymentMethods = {
  boleto: boolean;
  pix: boolean;
  dinheiro: boolean;
  cartaoCredito: boolean;
  depositoBancario: boolean;
};

const initialPaymentMethods: PaymentMethods = {
  boleto: true,
  pix: true,
  dinheiro: true,
  cartaoCredito: true,
  depositoBancario: true,
};

export const FilterModal = React.memo(({ visible, onClose }: FilterModalProps) => {
  const [condition, setCondition] = useState('novo');
  const [acceptsExchange, setAcceptsExchange] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>(initialPaymentMethods);

  useEffect(() => {
    if (!visible) {
      // Reset filters when modal closes
      setCondition('novo');
      setAcceptsExchange(false);
      setPaymentMethods(initialPaymentMethods);
    }
  }, [visible]);

  const handleApplyFilters = useCallback(() => {
    onClose();
    // Apply your filters logic here
  }, [onClose]);

  const handlePaymentMethodChange = useCallback((values: string[]) => {
    setPaymentMethods({
      boleto: values.includes('boleto'),
      pix: values.includes('pix'),
      dinheiro: values.includes('dinheiro'),
      cartaoCredito: values.includes('cartaoCredito'),
      depositoBancario: values.includes('depositoBancario'),
    });
  }, []);

  return (
    <Center>
      <Modal isOpen={visible} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton onPress={onClose} />
          <Modal.Header>Filtrar anúncios</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <Text>Condição</Text>
              <HStack space={2}>
                <Button
                  onPress={() => setCondition('novo')}
                  variant={condition === 'novo' ? 'solid' : 'outline'}
                >
                  NOVO
                </Button>
                <Button
                  onPress={() => setCondition('usado')}
                  variant={condition === 'usado' ? 'solid' : 'outline'}
                >
                  USADO
                </Button>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Aceita troca?</Text>
                <Switch
                  isChecked={acceptsExchange}
                  onToggle={() => setAcceptsExchange(!acceptsExchange)}
                />
              </HStack>
              <Text>Meios de pagamento aceitos</Text>
              <Checkbox.Group
                onChange={handlePaymentMethodChange}
                value={Object.keys(paymentMethods).filter(key => paymentMethods[key as keyof PaymentMethods])}
              >
                <Checkbox value="boleto">Boleto</Checkbox>
                <Checkbox value="pix">Pix</Checkbox>
                <Checkbox value="dinheiro">Dinheiro</Checkbox>
                <Checkbox value="cartaoCredito">Cartão de Crédito</Checkbox>
                <Checkbox value="depositoBancario">Depósito Bancário</Checkbox>
              </Checkbox.Group>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={onClose} variant="outline">
                Cancelar
              </Button>
              <Button onPress={handleApplyFilters}>
                Aplicar filtros
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
});

export default FilterModal;
