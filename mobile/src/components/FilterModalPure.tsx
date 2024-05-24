import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import CustomCheckbox from '../components/CustomCheckBox';

import { THEME } from '../theme';
import { X } from 'phosphor-react-native';

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

export const FilterModalPure = React.memo(({ visible, onClose }: FilterModalProps) => {
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

  const handlePaymentMethodChange = useCallback((key: keyof PaymentMethods, value: boolean) => {
    setPaymentMethods(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X />
          </TouchableOpacity>
          <Text style={styles.header}>Filtrar anúncios</Text>
          <View style={styles.body}>
            <Text>Condição</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={() => setCondition('novo')}
                style={[styles.button, condition === 'novo' && styles.selectedButton]}
              >
                <Text style={condition === 'novo' ? styles.selectedButtonText : styles.buttonTextA}>NOVO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCondition('usado')}
                style={[styles.button, condition === 'usado' && styles.selectedButton]}
              >
                <Text style={condition === 'usado' ? styles.selectedButtonText : styles.buttonTextA}>USADO</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.switchRow}>
              <Text>Aceita troca?</Text>
              <Switch
                value={acceptsExchange}
                onValueChange={() => setAcceptsExchange(!acceptsExchange)}
                thumbColor={THEME.colors.blue_light}
                trackColor={{ false: THEME.colors.gray[500], true: THEME.colors.blue_light }}
                style={{
                  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                }}
              />
            </View>
            <Text>Meios de pagamento aceitos</Text>
            <View>
              <CustomCheckbox
                label="Boleto"
                value={paymentMethods.boleto}
                onValueChange={(value) => handlePaymentMethodChange('boleto', value)}
              />
              <CustomCheckbox
                label="Pix"
                value={paymentMethods.pix}
                onValueChange={(value) => handlePaymentMethodChange('pix', value)}
              />
              <CustomCheckbox
                label="Dinheiro"
                value={paymentMethods.dinheiro}
                onValueChange={(value) => handlePaymentMethodChange('dinheiro', value)}
              />
              <CustomCheckbox
                label="Cartão de Crédito"
                value={paymentMethods.cartaoCredito}
                onValueChange={(value) => handlePaymentMethodChange('cartaoCredito', value)}
              />
              <CustomCheckbox
                label="Depósito Bancário"
                value={paymentMethods.depositoBancario}
                onValueChange={(value) => handlePaymentMethodChange('depositoBancario', value)}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.footerButtonA]}>
              <Text style={styles.buttonTextA}>Resetar filtros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApplyFilters} style={[styles.button, styles.footerButtonB]}>
              <Text style={styles.buttonTextB}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  body: {
    width: '100%',
    marginBottom: 20,
  },
  buttonGroup: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: THEME.colors.blue_light,
  },
  buttonTextA: {
    color: '#000',
  },
  buttonTextB: {
    color: '#fff',
  },
  selectedButtonText: {
    color: '#fff',
  },
  switchRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  footer: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerButtonA: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: THEME.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonB: {
    flex: 1,
    height: 45,
    marginHorizontal: 5,
    backgroundColor: THEME.colors.gray[100],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FilterModalPure;
