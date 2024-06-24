import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        index: "",
        title: "",
        alt: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("skill.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New Skill Information
                    </h2>
                </div>
            }
        >
            <Head title="My Skills" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="mt-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/4">
                                        <InputLabel htmlFor="index" value="Index" />
                                        <TextInput
                                            id="index"
                                            type="text"
                                            name="index"
                                            value={data.index}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("index", e.target.value)}
                                        />
                                        <InputError message={errors.index} className="mt-2" />
                                    </div>
                                    <div className="w-1/4">
                                        <InputLabel
                                            htmlFor="link_description"
                                            value="Alt"
                                        />

                                        <TextInput
                                            id="link_description"
                                            type="text"
                                            name="alt"
                                            value={data.alt}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("alt", e.target.value)}
                                        />

                                        <InputError message={errors.alt} className="mt-2" />
                                    </div>
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="title" value="Title" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("title", e.target.value)}
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="skill_image_path"
                                    value="Skill Image"
                                />
                                <TextInput
                                    id="skill_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("skill.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
