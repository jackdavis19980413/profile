import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        position: "",
        category: "",
        we_date: "",
        alt: "",
        c_title: "",
        c_subtitle: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("experience.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New Experience or Education Information
                    </h2>
                </div>
            }
        >
            <Head title="Experiences" />

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
                                        <InputLabel htmlFor="position" value="Position" />
                                        <SelectInput
                                            name="position"
                                            id="position"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("position", e.target.value)}
                                        >
                                            <option value="">Select Position</option>
                                            <option value="0">Left</option>
                                            <option value="1">Right</option>
                                        </SelectInput>
                                        <InputError message={errors.position} className="mt-2" />
                                    </div>
                                    <div className="w-1/4">
                                        <InputLabel htmlFor="category" value="Category" />
                                        <SelectInput
                                            name="category"
                                            id="category"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("category", e.target.value)}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="0">Experience</option>
                                            <option value="1">Education</option>
                                        </SelectInput>
                                        <InputError message={errors.category} className="mt-2" />
                                    </div>
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="we_date" value="Duration" />
                                        <TextInput
                                            id="we_date"
                                            type="text"
                                            name="we_date"
                                            value={data.we_date}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("we_date", e.target.value)}
                                        />
                                        <InputError message={errors.we_date} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Alt"
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    name="alt"
                                    value={data.alt}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("alt", e.target.value)}
                                />
                                <InputError message={errors.alt} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="image"
                                    value="Image"
                                />
                                <TextInput
                                    id="image"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="c_title" value="Title" />
                                <TextInput
                                    id="c_title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("title", e.target.value)}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="c_subtitle"
                                    value="Subtitle"
                                />
                                <TextAreaInput
                                    id="c_subtitle"
                                    name="subtitle"
                                    value={data.subtitle}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("subtitle", e.target.value)}
                                />
                                <InputError message={errors.subtitle} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("experience.index")}
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
