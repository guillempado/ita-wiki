import { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const StyledButton = styled.button<TButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${dimensions.borderRadius.base};
  margin: ${dimensions.spacing.xxs};
  padding: ${({ size }) =>
    (size === 'small' && dimensions.spacing.xxs) ||
    (size === 'large' && dimensions.spacing.md) ||
    dimensions.spacing.base};
  cursor: pointer;
  width: 100%;
  color: ${colors.white};
  border: 2px solid ${colors.primary};
  background-color: ${colors.primary};

  ${({ secondary }) =>
    secondary &&
    `
        background-color: ${colors.secondary};
        border: 2px solid ${colors.secondary};
        &:hover {
            background-color: ${colors.secondaryDark};
            border: 2px solid ${colors.secondaryDark};
        }
        &:active {
            background-color: ${colors.secondaryLight};
            border: 2px solid ${colors.secondaryLight};
        }
        &:disabled {
            background-color: ${colors.white};
            border: 2px solid ${colors.gray.gray5};
        }
    `}

  ${({ outline }) =>
    outline &&
    `
        background-color: ${colors.white};
        color: ${colors.gray.gray1};
        border: 2px solid ${colors.gray.gray4};
        &:hover {
            background-color: ${colors.outlineHover};
        }
        &:active {
            background-color: ${colors.outlineActive};
            border: 2px solid ${colors.primary};
        }
    `}
`

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean
  outline?: boolean
  size?: 'small' | 'normal' | 'large'
}

const Button: FC<TButton> = ({
  type = 'submit',
  secondary = false,
  outline = false,
  size = 'normal',
  children,
  ...rest
}) => (
  <StyledButton
    type={type}
    data-testid="button"
    secondary={secondary}
    outline={outline}
    size={size}
    {...rest}
  >
    {children}
  </StyledButton>
)

export default styled(Button)``
