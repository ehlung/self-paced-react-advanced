import styled from "styled-components";
import {
  typography,
  formInputBase,
  formItemBase,
  buttonBase,
  buttonVariants,
} from "../styles/common";
import Modal from "./Modal.jsx";

export default function AddRestaurantModal({ onAdd, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const category = fd.get("category");
    const name = fd.get("name");
    const description = fd.get("description") || "";

    if (!category || !name) {
      return;
    }

    onAdd({
      category: String(category),
      name: String(name),
      description: String(description),
    });
  };

  return (
    <Modal onClose={onClose}>
      <ModalTitle>새로운 음식점</ModalTitle>

      <form onSubmit={handleSubmit}>
        <FormItemRequired>
          <StyledLabel htmlFor="category">카테고리</StyledLabel>
          <StyledSelect name="category" id="category" required defaultValue="">
            <option value="" disabled>
              선택해 주세요
            </option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="기타">기타</option>
          </StyledSelect>
        </FormItemRequired>

        <FormItemRequired>
          <StyledLabel htmlFor="name">이름</StyledLabel>
          <StyledInput id="name" type="text" name="name" required />
        </FormItemRequired>

        <FormItem>
          <StyledLabel htmlFor="description">설명</StyledLabel>
          <StyledTextarea
            id="description"
            name="description"
            cols={30}
            rows={5}
            placeholder="메뉴 등 추가 정보를 입력해 주세요."
          />
          <HelpText>메뉴 등 추가 정보를 입력해 주세요.</HelpText>
        </FormItem>

        <ButtonContainer>
          <StyledButton variant="primary" type="submit">
            추가하기
          </StyledButton>
        </ButtonContainer>
      </form>
    </Modal>
  );
}

const ModalTitle = styled.h2`
  margin-bottom: 36px;
  ${typography.title}
`;

const FormItem = styled.div`
  ${formItemBase}
`;

const FormItemRequired = styled(FormItem)`
  label::after {
    padding-left: 4px;
    color: var(--primary-color);
    content: "*";
  }
`;

const StyledLabel = styled.label`
  color: var(--grey-400);
  ${typography.caption}
`;

const HelpText = styled.span`
  color: var(--grey-300);
  ${typography.caption}
`;

const StyledInput = styled.input`
  ${formInputBase}
  height: 44px;
`;

const StyledTextarea = styled.textarea`
  ${formInputBase}
  resize: none;
`;

const StyledSelect = styled.select`
  ${formInputBase}
  height: 44px;
  color: var(--grey-300);
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  ${buttonBase}
  ${({ variant }) => buttonVariants[variant] || buttonVariants.secondary}
`;
