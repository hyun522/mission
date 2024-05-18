import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { formattdDate, formattdDay } from '../utils/date';

const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  background-color: #e3e7eb;
`;

const MainBox = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 400px;
  height: 70dvh;
  padding: 40px 30px;
  position: relative;
`;

const Top = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const ListsBox = styled.div`
  height: 45dvb;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const AllListsBox = styled.div``;

const CheckListsBox = styled.div`
  height: 20dvb;
`;

const TextListsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckTextBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const CheckInput = styled.input`
  margin-right: 5px;
`;

const TextList = styled.div`
  color: #666;
  font-size: 18px;
`;

const CheckedTextList = styled(TextList)`
  color: #e3e7eb;
`;

const DateBox = styled.div`
  font-size: 30px;
`;

const DayBox = styled.div`
  color: #9b9b9d;
  margin-top: 10px;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    top: 120px;
    left: 0;
    background-color: #f3f4f8;
  }
`;

const ListAddButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 73px;
  height: 70px;
  background-color: #31d19c;
  color: #fff;
  font-size: 50px;
  position: absolute;
  transform: translate(-50%, 0);
  left: 50%;
  bottom: -35px;
  cursor: pointer;
`;

const ListMinusButton = styled(ListAddButton)`
  background-color: #fe787b;
  font-size: 45px;
  padding-bottom: 5px;
  z-index: 1;
`;

const InputBox = styled.div`
  width: 100%;
  height: 15dvh;
  background-color: #f9f9f9bf;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddInput = styled.input`
  margin-bottom: 20px;
  width: 60%;
  padding: 5px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }
`;

const TrashAlt = styled(FaTrashAlt)`
  color: gray;
  &:hover {
    color: red;
  }
`;

export default function ToDoList() {
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState<
    { id: number; text: string; check: boolean }[]
  >([]);

  const handlePlusMinusInput = (isPlus: boolean) => {
    setIsPlus(isPlus);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleListAddText(text);
    }
  };

  const handleListAddText = (text: string) => {
    const newItem = {
      id: Math.floor(Math.random() * 1000),
      text: text,
      check: false,
    };
    const copyList = [...todoList, newItem];
    setTodoList(copyList);
    setText('');
  };

  const handleToggleCheck = (id: number) => {
    const updatedList = todoList.map((el) => {
      if (el.id === id) {
        return { ...el, check: !el.check };
      }
      return el;
    });
    setTodoList(updatedList);
  };

  const handleDelete = (id: number) => {
    const updatedList = todoList.filter((el) => el.id !== id);
    setTodoList(updatedList);
  };

  return (
    <Bg>
      <MainBox>
        <Top>
          <DateBox>{formattdDate}</DateBox>
          <DayBox>{formattdDay}</DayBox>
        </Top>
        <ListsBox>
          <AllListsBox>
            {todoList
              .filter((el) => !el.check)
              .map((el) => (
                <TextListsDiv key={el.id}>
                  <CheckTextBox>
                    <CheckInput
                      type='checkbox'
                      checked={el.check}
                      onChange={() => handleToggleCheck(el.id)}
                    />
                    {el.check ? (
                      <CheckedTextList>{el.text}</CheckedTextList>
                    ) : (
                      <TextList>{el.text}</TextList>
                    )}
                  </CheckTextBox>
                  <TrashAlt onClick={() => handleDelete(el.id)} />
                </TextListsDiv>
              ))}
          </AllListsBox>
          <CheckListsBox>
            {todoList.some((el) => el.check) && (
              <p style={{ marginBottom: '10px' }}>👍 완료</p>
            )}
            {todoList
              .filter((el) => el.check)
              .map((el) => (
                <TextListsDiv key={el.id}>
                  <CheckTextBox>
                    <CheckInput
                      type='checkbox'
                      checked={el.check}
                      onChange={() => handleToggleCheck(el.id)}
                    />
                    {el.check ? (
                      <CheckedTextList>{el.text}</CheckedTextList>
                    ) : (
                      <TextList key={el.id}>{el.text}</TextList>
                    )}
                  </CheckTextBox>
                  <TrashAlt onClick={() => handleDelete(el.id)} />
                </TextListsDiv>
              ))}
          </CheckListsBox>
        </ListsBox>
        {isPlus ? (
          <>
            <ListMinusButton onClick={() => handlePlusMinusInput(false)}>
              x
            </ListMinusButton>
            <InputBox>
              <AddInput
                placeholder='할일을 입력 후 Enter를 누르세요.'
                onChange={handleText}
                onKeyDown={activeEnter}
                value={text}
              />
            </InputBox>
          </>
        ) : (
          <ListAddButton onClick={() => handlePlusMinusInput(true)}>
            +
          </ListAddButton>
        )}
      </MainBox>
    </Bg>
  );
}
