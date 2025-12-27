import styled from "styled-components";

export default function Modal({ onClose, children }) {
  return (
    <Wrapper>
      <Backdrop onClick={onClose} />
      <Container
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 32px 16px;
  border-radius: 8px 8px 0px 0px;
  background: var(--grey-100);
`;
