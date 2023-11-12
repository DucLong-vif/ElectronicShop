import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const  Markdown = ({labe,value, changeValue,name,invalidFields, setInvalidFields}) => {
  return (
    <div className='flex flex-col'>
        <span className='text-xl gap-4'>{labe}</span>
        <Editor
            apiKey='lejvr08vjx8vwx8pmvazqwg9m2d4ebr67wkfvci8udiqzjw3'
            initialValue={value}
            init={{
            height: 500,
            menubar: true,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onChange={e => changeValue(prev => ({...prev,[name] :e.target.getContent()}))}
            onFocus={() => setInvalidFields && setInvalidFields([])}
        />
        {invalidFields?.some(el => el.name === name) && <small className='text-main text-sm'>{invalidFields?.find(el => el.name === name)?.mes}</small>}
    </div>
  );
}

export default memo(Markdown)