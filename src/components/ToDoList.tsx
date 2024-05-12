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
  //반응형 떄문에 width height 지정 해주고 싶지 않은데 방법이 있을까..
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
  //z-index 관리 어렵다고 하던데..
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

export default function ToDoList() {
  const [input, setInput] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState<
    { text: string; hover: boolean; check: boolean }[]
  >([]);

  const handlePlusInput = () => {
    setInput(true);
  };
  const handleMinusInput = () => {
    setInput(false);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleTextList(text);
    }
  };

  const handleTextList = (text: string) => {
    const newItem = { text: text, hover: false, check: false };
    const copyList = [...todoList, newItem];
    console.log(copyList);
    setTodoList(copyList);
    setText('');
  };

  const handleMouseOver = (index: number) => {
    const copyList = [...todoList];
    copyList[index].hover = true;
    setTodoList(copyList);
  };

  const handleCheck = (text: string) => {
    const updatedList = todoList.map((el) => {
      if (el.text === text) {
        return { ...el, check: !el.check };
      }
      return el;
    });
    setTodoList(updatedList);
  };

  const handleMouseOut = (index: number) => {
    const copyList = [...todoList];
    copyList[index].hover = false;
    setTodoList(copyList);
  };

  const handleDelete = (index: number) => {
    const copyList = [...todoList];
    copyList.splice(index, 1);
    setTodoList(copyList);
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
              .map((el, index) => (
                <>
                  <TextListsDiv>
                    <CheckTextBox>
                      <CheckInput
                        type='checkbox'
                        checked={el.check}
                        onChange={() => handleCheck(el.text)}
                      />
                      {el.check ? (
                        <CheckedTextList key={index}>{el.text}</CheckedTextList>
                      ) : (
                        <TextList key={index}>{el.text}</TextList>
                      )}
                    </CheckTextBox>
                    <div
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                    >
                      <FaTrashAlt
                        color={el.hover ? 'red' : '#666'}
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </TextListsDiv>
                </>
              ))}
          </AllListsBox>
          <CheckListsBox>
            {todoList.some((el) => el.check) && (
              <p style={{ marginBottom: '10px' }}>👍 완료</p>
            )}
            {todoList
              .filter((el) => el.check)
              .map((el, index) => (
                <>
                  <TextListsDiv>
                    <CheckTextBox>
                      <CheckInput
                        type='checkbox'
                        checked={el.check}
                        onChange={() => handleCheck(el.text)}
                      />
                      {el.check ? (
                        <CheckedTextList key={index}>{el.text}</CheckedTextList>
                      ) : (
                        <TextList key={index}>{el.text}</TextList>
                      )}
                    </CheckTextBox>
                    <div
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                    >
                      <FaTrashAlt
                        color={el.hover ? 'red' : '#666'}
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </TextListsDiv>
                </>
              ))}
          </CheckListsBox>
        </ListsBox>
        {input ? (
          <>
            <ListMinusButton onClick={() => handleMinusInput()}>
              x
            </ListMinusButton>
            <InputBox>
              <AddInput
                placeholder='할일을 입력 후 Enter를 누르세요.'
                onChange={(e) => handleText(e)}
                onKeyDown={(e) => activeEnter(e)}
                value={text}
              />
            </InputBox>
          </>
        ) : (
          <ListAddButton onClick={() => handlePlusInput()}>+</ListAddButton>
        )}
      </MainBox>
    </Bg>
  );
}
