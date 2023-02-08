import { useState, Dispatch, SetStateAction } from 'react';
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
    enter: 13
};

interface TagsInputProps {
    tags: any;
    setTags: Dispatch<SetStateAction<any>>;
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagsInput = ({ tags, setTags }: TagsInputProps) => {
    // const [tags, setTags] = useState([
    //     { id: 'Thailand', text: 'Thailand' },
    //     { id: 'India', text: 'India' },
    //     { id: 'Vietnam', text: 'Vietnam' },
    //     { id: 'Turkey', text: 'Turkey' }
    // ]);

    const handleDelete = i => {
        setTags(tags.filter((tag: any, index: any) => index !== i));
    };

    const handleAddition = (tag: any) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag: any, currPos: number, newPos: number) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = (index: any) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div className='mt-2'>
            <label className='font-normal text-sm'>
                Tags <span className='text-red-500'>*</span></label>
            <ReactTags
                tags={tags}
                // suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
            />
        </div>
    );
};

export default TagsInput