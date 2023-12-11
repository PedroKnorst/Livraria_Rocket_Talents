import React from 'react';
import {
  ButtonCancel,
  ButtonSave,
  ContainerButtons,
  ContainerInputs,
  ContainerBookPage,
  SectionInputs,
} from '../style';
import InputFile from '../../../components/Inputs/InputFile';
import Select from '../../../components/Inputs/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { getBook, postCover, putBook } from '../../../services/books';
import useForm from '../../../hooks/useForm';
import { Book } from '../../../interfaces/book';
import { UserBooksContext } from '../../../context/UserContext';
import NavBack from '../../../components/NavBack';
import InputText from '../../../components/Inputs/InputText';
import InputTextArea from '../../../components/Inputs/TexArea';

const EditBook = () => {
  const { id } = useParams();
  const { books } = React.useContext(UserBooksContext);
  const [book, setBook] = React.useState<Book | null>(null);
  const title = useForm();
  const synopsis = useForm();
  const author = useForm();
  const genre = useForm();
  const entryDate = useForm();
  const cover = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id)
      getBook(id).then(res => {
        setBook(res.data);
        cover.setValue(res.data.image);
      });
  }, []);

  React.useEffect(() => {
    const convertData = (dataString: string) => {
      const partes = dataString.split('/');
      const dia = partes[0].padStart(2, '0');
      const mes = partes[1].padStart(2, '0');
      const ano = partes[2];
      return `${ano}-${mes}-${dia}`;
    };

    if (book) {
      book.systemEntryDate = convertData(book.systemEntryDate);

      title.setValue(book.title);
      synopsis.setValue(book.synopsis);
      author.setValue(book.author);
      genre.setValue(book.genre);
      entryDate.setValue(book.systemEntryDate);
    }
  }, [book]);

  const validateFields = () => {
    title.validate();
    author.validate();
    genre.validate();
    synopsis.validate();
    entryDate.validate();
    cover.validate();

    if (
      title.validate() &&
      author.validate() &&
      genre.validate() &&
      synopsis.validate() &&
      entryDate.validate() &&
      cover.validate()
    ) {
      return true;
    } else return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateFields();

    if (book && validation && id) {
      const changedDateEntry = new Date(entryDate.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

      const formData = new FormData();
      formData.append('uploaded_file', cover.file);

      let uploadedImg = cover.value;

      await postCover(formData).then(res => {
        uploadedImg = res.data;
      });

      putBook(id, {
        ...book,
        title: title.value,
        author: author.value,
        genre: genre.value,
        synopsis: synopsis.value,
        systemEntryDate: changedDateEntry,
        image: uploadedImg,
      }).then(res => res.data);

      navigate('/home/biblioteca');
      alert('Livro editado com sucesso!');
      location.reload();
    }
  };

  const filterGenre = books.reduce((items: string[], currentItem: Book) => {
    if (currentItem.genre)
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
    return items;
  }, []);

  const defaultItem = () => {
    genre.setValue('');
  };

  if (book)
    return (
      <ContainerBookPage>
        <NavBack path="/home/biblioteca" page="Editar Livro" />
        <SectionInputs onSubmit={handleSubmit}>
          <ContainerInputs>
            <InputFile
              onBlur={cover.onBlur}
              onChangeFile={cover.onChangeFile}
              error={cover.error}
              img={cover.value}
              cover={book.image}
            />
            <InputText
              onBlur={title.onBlur}
              gridArea={{ gridArea: 'titulo' }}
              id="input_title"
              label="Títutlo"
              onChange={title.onChange}
              value={title.value}
              type="text"
              error={title.error}
            />
            <InputTextArea
              onBlur={synopsis.onBlur}
              gridArea={{ gridArea: 'sinopse' }}
              id="input_synopsis"
              label="Sinopse"
              onChange={synopsis.onChange}
              value={synopsis.value}
              error={synopsis.error}
            />
            <InputText
              onBlur={author.onBlur}
              gridArea={{ gridArea: 'autor' }}
              id="input_author"
              label="Autor"
              onChange={author.onChange}
              value={author.value}
              type="text"
              error={author.error}
            />
            <Select
              onBlur={genre.onBlur}
              mediaquerie="true"
              defaultItem={defaultItem}
              selectItem={e => genre.onSelect(e)}
              list={filterGenre}
              value={genre.value}
              style={{ gridArea: 'genero' }}
              labelStyle={'#133052'}
              label={'Gênero'}
            />
            <InputText
              onBlur={entryDate.onBlur}
              gridArea={{ gridArea: 'data' }}
              id="input_date"
              label="Data de entrada"
              onChange={entryDate.onChange}
              value={entryDate.value}
              type="date"
              error={entryDate.error}
            />
          </ContainerInputs>
          <ContainerButtons>
            <ButtonCancel to="/home/biblioteca">Cancelar</ButtonCancel>
            <ButtonSave>Salvar</ButtonSave>
          </ContainerButtons>
        </SectionInputs>
      </ContainerBookPage>
    );
};

export default EditBook;
