

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { render } from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';

// const suggestions = COUNTRIES map((country):string => {
//     return {
//         id: country,
//         text: country
//     };
// });

const KeyCodes = {
    comma: 188,
    enter: 13,
    space: 32,
};

interface TagsInputProps {
    updateState: boolean;
    tags: any;
    setTags: Dispatch<SetStateAction<any>>;
}

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

const TagsInput = ({ updateState, tags, setTags }: TagsInputProps) => {
    const [parsedTags, setParsedTags] = useState([]);
    console.log('tags input tags', tags)
    useEffect(() => {
        console.log('useeffect runs', tags)
        setParsedTags(
            tags.map((tag: string) => {
                return {
                    id: tag,
                    text: tag
                };
            }))
    }, [updateState])


    console.log(updateState)
    useEffect(() => {
        setTags(
            parsedTags.map(tag => tag.text)
        )
    }, [parsedTags])


    const handleDelete = i => {
        setParsedTags(
            parsedTags.filter((tag: any, index: any) => index !== i));
    };

    const handleAddition = (tag: any) => {
        setParsedTags([...parsedTags, tag]);
    };

    const handleDrag = (tag: any, currPos: number, newPos: number) => {
        const newTags = parsedTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setParsedTags(newTags);
    };

    const handleTagClick = (index: any) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div className='mt-2'>
            <label className='font-normal text-blue-gray-600 text-sm'>
                Tags <span className='text-red-500'>*</span></label>
            <ReactTags
                tags={parsedTags}
                // suggestions={suggestions}
                delimiters={delimiters}
                placeholder='Add new tag'
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                onTagUpdate={()=>{console.log('handleinputchange')}}
                inputFieldPosition="bottom"
                autocomplete
                classNames={{
                    tags: 'font-normal text-blue-gray-600 text-sm',
                    tagInput: '',
                    tagInputField: 'w-fill h-6',
                    selected: '',
                    tag: 'mx-1 font-normal text-blue-gray-300  text-sm ',
                    remove: 'removeClass',
                    suggestions: 'suggestionsClass',
                    activeSuggestion: 'activeSuggestionClass',
                    editTagInput: 'editTagInputClass',
                    editTagInputField: 'editTagInputField',
                    clearAll: 'clearAllClass',
                }}
            />
            <div className='border-width-1 border-solid border-black h-[1px] w-fill bg-blue-gray-200 mt-2'></div>
        </div>
    );
};

export default TagsInput