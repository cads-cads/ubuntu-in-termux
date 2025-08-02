// src/components/Input/index.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { scale, fontScale } from '../../utils/responsive'; // Ajuste o caminho se necessário

// --- 1. Interface para as Props do Input ---
interface InputProps extends TextInputProps {
  /**
   * Largura do input em unidades de design (ex: pixels de um design de 375px).
   * Será escalado proporcionalmente à largura da tela atual.
   * Padrão: 300 (escalado).
   */
  inputWidth?: number;
  /**
   * Altura do input em unidades de design (ex: pixels de um design de 375px).
   * Será escalado proporcionalmente à largura da tela atual.
   * Padrão: 50 (escalado).
   */
  inputHeight?: number;
  /**
   * Cor de fundo do input.
   * Padrão: "white".
   */
  bgColor?: string;
  /**
   * Tamanho da fonte do texto do input em unidades de design (ex: pixels de um design de 375px).
   * Será escalado proporcionalmente e ajustado para o tamanho da fonte do sistema do usuário.
   * Padrão: 16 (escalado).
   */
  fontSize?: number;
  /**
   * Cor do texto digitado no input.
   * Padrão: "#333" (cinza escuro).
   */
  textColor?: string;
  /**
   * Cor da borda do input.
   * Padrão: "#ddd" (cinza claro).
   */
  borderColor?: string;
  /**
   * Largura da borda do input.
   * Padrão: 1.
   */
  borderWidth?: number;
  /**
   * Raio da borda do input.
   * Padrão: 8.
   */
  borderRadius?: number;
  /**
   * Estilo adicional para o container do input (View que envolve o TextInput).
   */
  containerStyle?: ViewStyle;
  /**
   * Estilo adicional para o próprio TextInput.
   */
  textInputStyle?: TextStyle;
}

// --- 2. Styled Component para o Container (View) do Input ---
// Usamos uma View para envolver o TextInput e aplicar estilos de largura/altura/bordas/fundo.
// Isso facilita o posicionamento e a aplicação de bordas que podem não ser ideais diretamente no TextInput.
const StyledInputContainer = styled.View<
  Omit<InputProps, 'text' | 'onPress' | 'fontSize' | 'textColor' | 'containerStyle' | 'textInputStyle' | keyof TextInputProps>
>`
  width: ${({ inputWidth }) => (inputWidth ? scale(inputWidth) : scale(300))}px;
  height: ${({ inputHeight }) => (inputHeight ? scale(inputHeight) : scale(50))}px;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-color: ${({ borderColor }) => borderColor || '#ddd'};
  border-width: ${({ borderWidth }) => borderWidth || 1}px;
  border-radius: ${({ borderRadius }) => borderRadius || 8}px;
  justify-content: center; /* Centraliza o texto verticalmente dentro da altura */
  padding-horizontal: ${scale(15)}px; /* Padding interno para o texto não colar nas bordas */
`;

// --- 3. Styled Component para o TextInput em si ---
// Aplica estilos específicos de texto e comportamento do input.
const StyledTextInput = styled.TextInput<
  Omit<InputProps, 'text' | 'onPress' | 'inputWidth' | 'inputHeight' | 'bgColor' | 'borderColor' | 'borderWidth' | 'borderRadius' | 'containerStyle'>
>`
  flex: 1; /* Faz o TextInput preencher o container */
  color: ${({ textColor }) => textColor || '#333'};
  font-size: ${({ fontSize }) => fontScale(fontSize || 16)}px;
  /* Remover padding padrão do Android se causar problemas visuais */
  padding: 0;
`;

// --- 4. O Componente Principal Input (Componente Funcional) ---
export const Input: React.FC<InputProps> = ({
  inputWidth,
  inputHeight,
  bgColor,
  fontSize,
  textColor,
  borderColor,
  borderWidth,
  borderRadius,
  containerStyle,
  textInputStyle,
  ...rest // Captura quaisquer outras props padrão do TextInputProps (placeholder, onChangeText, value, keyboardType, etc.)
}) => {
  return (
    <StyledInputContainer
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      bgColor={bgColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      style={containerStyle} // Permite estilos externos para o container
    >
      <StyledTextInput
        fontSize={fontSize}
        textColor={textColor}
        style={textInputStyle} // Permite estilos externos para o TextInput
        {...rest} // Passa todas as props restantes (placeholder, value, onChangeText, etc.) para o TextInput
      />
    </StyledInputContainer>
  );
};