import { useState } from 'react';
import styled from 'styled-components';

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

const TextList = styled.div`
  background-color: pink;
  color: #666;
  font-size: 18px;
  margin-bottom: 5px;
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
  const [input, SetInput] = useState<boolean>(false);
  const [text, SetText] = useState('');
  const [textList, SetTextList] = useState<string[]>([]);
  const today = new Date();
  const formattdDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const formattdDay = `${week[today.getDay()]}요일`;

  const handlePlusInput = () => {
    SetInput(true);
  };
  const handleMinusInput = () => {
    SetInput(false);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetText(e.target.value);
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTextList(text);
    }
  };

  const handleTextList = (text: string) => {
    const copyList = [...textList, text];
    SetTextList(copyList);
    SetText('');
  };

  return (
    <Bg>
      <MainBox>
        <Top>
          <DateBox>{formattdDate}</DateBox>
          <DayBox>{formattdDay}</DayBox>
        </Top>
        {textList.map((el, index) => (
          <TextList key={index}>{el}</TextList>
        ))}

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
