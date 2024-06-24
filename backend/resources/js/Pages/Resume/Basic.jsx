import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Basic({ auth, resume }) {
    const { data, setData, post, errors, reset } = useForm({
        id: resume.data.id,
        firstname: resume.data.firstname || "",
        lastname: resume.data.lastname || "",
        email: resume.data.email || "",
        subtitle: resume.data.subtitle || "",
        caption: resume.data.caption || "",
        author: resume.data.author || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("resume.change", { profile: data.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Basic Personal Resume
                    </h2>
                </div>
            }
        >
            <Head title="Resume" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="mt-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <InputLabel htmlFor="firstname" value="First Name" />
                                        <TextInput
                                            id="firstname"
                                            type="text"
                                            name="firstname"
                                            value={data.firstname}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("firstname", e.target.value)}
                                        />
                                        <InputError message={errors.firstname} className="mt-2" />
                                    </div>

                                    <div className="w-1/2">
                                        <InputLabel htmlFor="lastname" value="Last Name" />
                                        <TextInput
                                            id="lastname"
                                            type="text"
                                            name="lastname"
                                            value={data.lastname}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("lastname", e.target.value)}
                                        />
                                        <InputError message={errors.lastname} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="user_email" value="Email" />

                                <TextInput
                                    id="user_email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("email", e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="subtitle" value="Subtitle" />

                                <TextInput
                                    id="subtitle"
                                    type="text"
                                    name="subtitle"
                                    value={data.subtitle}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("subtitle", e.target.value)}
                                />

                                <InputError message={errors.subtitle} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <InputLabel
                                            htmlFor="image_path"
                                            value="Image"
                                        />
                                        <TextInput
                                            id="image_path"
                                            type="file"
                                            name="picture"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("picture", e.target.files[0])}
                                        />
                                        <InputError message={errors.picture} className="mt-2" />
                                    </div>
                                    <div className="w-1/2">
                                        <InputLabel
                                            htmlFor="cv_file_path"
                                            value="CV attachment"
                                        />
                                        <TextInput
                                            id="cv_file_path"
                                            type="file"
                                            name="cv_file"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("cv_file", e.target.files[0])}
                                        />
                                        <InputError message={errors.cv_file} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="caption" value="Caption" />

                                <TextInput
                                    id="caption"
                                    type="text"
                                    name="caption"
                                    value={data.caption}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("caption", e.target.value)}
                                />

                                <InputError message={errors.caption} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="author"
                                    value="Author"
                                />

                                <TextInput
                                    id="author"
                                    type="text"
                                    name="author"
                                    value={data.author}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("author", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.author}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("resume.index")}
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
