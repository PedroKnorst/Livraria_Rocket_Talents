import React from "react";
import {
  ButtonClose,
  BookModal,
  ContainerLinkBorrow,
  ContainerBookModal,
} from "../style";
import Close from "../../../assets/svg/Close";
import { styled } from "styled-components";
import BookSvg from "../../../assets/svg/BookSvg";
import { getBook, putBook } from "../../../services/books";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import InputText from "../../../components/Inputs/InputText";
import { Book } from "../../../interfaces/book";

const ContainerBorrowInputs = styled.form`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const BookDataBorrow = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Book | null>(null);
  const student = useForm();
  const team = useForm();
  const date1 = useForm();
  const date2 = useForm();
  const navigate = useNavigate();
  const newStudent = {
    studentName: student.value,
    class: team.value,
    withdrawalDate: date1.value,
    deliveryDate: date2.value,
  };

  React.useEffect(() => {
    if (id)
      getBook(id).then((res) => {
        setData(res.data);
      });
  }, [id]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      student.validate() &&
      team.validate() &&
      date1.validate() &&
      date2.validate() &&
      id &&
      data
    ) {
      putBook(id, {
        ...data,
        rentHistory: [...data.rentHistory, newStudent],
        isBorrowed: true,
      }).then((res) => {
        return res.data;
      });
      return navigate(`../livro/${id}`);
    }
  }

  return (
    <ContainerBookModal>
      <BookModal>
        <h2>Informe os dados do aluno antes de continuar</h2>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <ContainerBorrowInputs onSubmit={handleSubmit}>
          <InputText
            id="name"
            label="Nome do aluno"
            onChange={student.onChange}
            value={student.value}
            type="text"
            error={student.error}
          />
          <InputText
            id="class"
            label="Turma"
            onChange={team.onChange}
            value={team.value}
            type="text"
            error={team.error}
          />
          <InputText
            id="withdrawalDate"
            label="Data de retirada"
            onChange={date1.onChange}
            value={date1.value}
            type="date"
            error={date1.error}
          />
          <InputText
            id="deliveryDate"
            label="Data de entrega"
            onChange={date2.onChange}
            value={date2.value}
            type="date"
            error={date2.error}
          />
          <ContainerLinkBorrow>
            <BookSvg />
            Emprestar
          </ContainerLinkBorrow>
        </ContainerBorrowInputs>
      </BookModal>
    </ContainerBookModal>
  );
};

export default BookDataBorrow;