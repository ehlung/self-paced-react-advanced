import styled from "styled-components";
import { typography, buttonBase, buttonVariants } from "../styles/common";
import Modal from "./Modal.jsx";

export default function RestaurantDetailModal({ restaurant, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalTitle>{restaurant.name}</ModalTitle>
      <RestaurantInfo>
        <DescriptionText>
          {restaurant.description || "상세 설명이 없습니다."}
        </DescriptionText>
      </RestaurantInfo>

      <ButtonContainer>
        <StyledButton variant="primary" type="button" onClick={onClose}>
          확인
        </StyledButton>
      </ButtonContainer>
    </Modal>
  );
}

const ModalTitle = styled.h2`
  margin-bottom: 36px;
  ${typography.title}
`;

const RestaurantInfo = styled.div`
  margin-bottom: 24px;
`;

const DescriptionText = styled.p`
  ${typography.body}
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  ${buttonBase}
  ${({ variant }) => buttonVariants[variant] || buttonVariants.secondary}
`;
