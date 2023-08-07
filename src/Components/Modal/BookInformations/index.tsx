import {
  ButtonClose,
  ContainerBook,
  ContainerBookButtons,
  CoverBook,
  EditButton,
  HistoryButton,
  InactiveLink,
  LinkBorrow,
  TextBook,
} from "../style";
import Close from "../../../assets/svg/Close";
import BookSvg from "../../../assets/svg/BookSvg";

const BookInfomations = ({ data }) => {
  return (
    <ContainerBook>
      <ButtonClose to="..">
        <Close />
      </ButtonClose>
      <CoverBook
        src={`http://localhost:3001/static/${data.image}`}
        alt="livro"
      />
      <LinkBorrow active={`${true}`} to={`../emprestar/${data.id}`}>
        <BookSvg />
        Emprestar
      </LinkBorrow>
      <TextBook>
        <h2>{data.title}</h2>
        <div>
          <h3>Sinopse</h3>
          <p>{data.synopsis}</p>
        </div>
        <div>
          <h3>Autor</h3>
          <p>{data.author}</p>
        </div>
        <div>
          <h3>Gênero</h3>
          <p>{data.genre}</p>
        </div>
        <div>
          <h3>Data de Entrada</h3>
          <p>{data.systemEntryDate}</p>
        </div>
      </TextBook>
      <ContainerBookButtons>
        <EditButton to={`/home/editar/${data.id}`}>Editar</EditButton>
        <InactiveLink to={`../inativar/${data.id}`}>Inativar</InactiveLink>
        <HistoryButton to={`../historico/${data.id}`}>Histórico</HistoryButton>
      </ContainerBookButtons>
    </ContainerBook>
  );
};

export default BookInfomations;
