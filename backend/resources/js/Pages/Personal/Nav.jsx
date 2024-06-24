import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Nav({status, content}) {
    const { data, setData, post, processing, errors } = useForm({
        name: content.name,
        picture: content.picture,
        caption: content.caption,
        author: content.author,
    });

    const [new_status, setStatus] = useState(status);

    const submit = (e) => {
        e.preventDefault();

        post(route('personal.update'), {
            onSuccess: (page) => {
                setStatus(page.props.status);
            },
            onError: (errors) => {
                console.log('Error submitting form.');
            }
        }
        );
    };
    
    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div
                className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
            >
                {new_status && <div className="mb-4 font-medium text-sm text-green-600">{new_status}</div>}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            type="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="picture" value="Picture" />

                        <TextInput
                            id="picture"
                            type="picture"
                            name="picture"
                            value={data.picture}
                            className="mt-1 block w-full"
                            autoComplete="picture"
                            isFocused={true}
                            onChange={(e) => setData('picture', e.target.value)}
                        />

                        <InputError message={errors.picture} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="caption" value="Caption" />

                        <TextInput
                            id="caption"
                            type="caption"
                            name="caption"
                            value={data.caption}
                            className="mt-1 block w-full"
                            autoComplete="caption"
                            isFocused={true}
                            onChange={(e) => setData('caption', e.target.value)}
                        />

                        <InputError message={errors.caption} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="author" value="Author" />

                        <TextInput
                            id="author"
                            type="author"
                            name="author"
                            value={data.author}
                            className="mt-1 block w-full"
                            autoComplete="author"
                            isFocused={true}
                            onChange={(e) => setData('author', e.target.value)}
                        />

                        <InputError message={errors.author} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            
        </div>
    );
}
