import { MdOutlineCameraAlt } from 'react-icons/md';
import React, { useState } from 'react';
import supabase from '@/apis/supabaseApi';
import { FaTimes } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './imgUpload.module.scss';

const cx = classNames.bind(styles);

function ImgUpload() {
  //유저가 업로드한 파일을 담는 state
  const [file, setFile] = useState(null);
  //이미지를 미리보기위한 url을 저장하는 state
  const [previewUrl, setPreviewUrl] = useState(null);
  // console.log(previewUrl);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  //   코드의 동작 흐름을 자세히 설명드리겠습니다. 이 코드는 사용자가 파일 입력 요소에서 파일을 선택했을 때,
  //  해당 파일을 읽고 미리보기 URL을 생성하여 이미지를 미리보여주는 역할을 합니다. 또한, FileReader 객체를 사용하여 파일을 읽고,
  // 파일의 내용이 로드될 때 onloadend 이벤트 핸들러를 통해 결과를 처리합니다.

  const handleFileChange = (event) => {
    console.log(event);
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));

    // 이미지 미리보기 URL 생성
    // 파일의 내용을(혹은 raw data버퍼로) 읽고 사용자의 컴퓨터에 저장하는 것을 가능하게 해줍니다.
    //이미지 미리보기, 파일 업로드 전 파일의 내용 확인 등 다양한 용도로 사용
    // const reader = new FileReader();
    //onloadend 콜백 함수가 실행
    // reader.onloadend = () => {
    //이 콜백 함수에서 setPreviewUrl을 호출하여 미리보기 URL을 상태 변수 previewUrl에 저장
    //   setPreviewUrl(reader.result);
    // };
    // if (selectedFile) {
    //   reader.readAsDataURL(selectedFile);
    //FileReader 객체의 메서드 중 하나
    //선택한 파일을 데이터 URL 형식으로 읽는 코드
    // }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      setMessage('');

      if (!file) {
        alert('Please select a file to upload');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          //파일이 캐시될 수 있는 시간
          //3600초(즉, 1시간) 동안 캐시될 수 있음
          cacheControl: '3600',
          // upsert는 파일이 이미 존재할 경우 덮어쓸지 여
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      setMessage('Image uploaded successfully');
      setPreviewUrl(null);
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image!');
    } finally {
      setUploading(false);
    }
  };

  const handleCancelSelection = () => {
    setPreviewUrl(null);
    setFile(null);
  };

  return (
    <>
      {previewUrl && (
        <div className={cx('prevImgContainer')}>
          <img src={previewUrl} alt='Preview' className={cx('prevImg')} />
          <button onClick={handleCancelSelection} className={cx('uploadBTN')}>
            <FaTimes size={12} />
          </button>
        </div>
      )}
      <label htmlFor='fileInput' className={cx('fileLabel')}>
        <MdOutlineCameraAlt />
      </label>
      <input
        type='file'
        id='fileInput'
        onChange={handleFileChange}
        className={cx('fileInput')}
      />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {/* {message  && <p>{message}</p>} */}
    </>
  );
}

export default ImgUpload;
