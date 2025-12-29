import { css } from "styled-components";

export const typography = {
  title: css`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
  `,
  subtitle: css`
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
  `,
  body: css`
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  `,
  caption: css`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  `,
};

export const formInputBase = css`
  padding: 8px;
  margin: 6px 0;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  font-size: 16px;
`;

export const formItemBase = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
`;

export const buttonBase = css`
  width: 100%;
  height: 44px;
  margin-right: 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  ${typography.caption}

  &:last-child {
    margin-right: 0;
  }
`;

export const buttonVariants = {
  primary: css`
    background: var(--primary-color);
    color: var(--grey-100);
  `,
  secondary: css`
    border: 1px solid var(--grey-300);
    background: transparent;
    color: var(--grey-300);
  `,
};
