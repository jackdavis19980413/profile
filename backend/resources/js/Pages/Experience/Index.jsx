import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    EXPERIENCE_POSITION_CLASS_MAP,
    EXPERIENCE_POSITION_TEXT_MAP,
    EXPERIENCE_CATEGORY_CLASS_MAP,
    EXPERIENCE_CATEGORY_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, exps, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("experience.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("experience.index"), queryParams);
    };

    const deleteExperience = (experience) => {
        if (!window.confirm("Are you sure you want to delete the experience?")) {
            return;
        }
        router.delete(route("experience.destroy", experience.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Experiences
                    </h2>
                    <Link
                        href={route("experience.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Experiences" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <th className="px-3 py-3">Image</th>
                                            <th className="px-3 py-3">Content</th>
                                            <th className="px-3 py-3">alt</th>
                                            <TableHeading
                                                name="we_date"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Duration
                                            </TableHeading>
                                            <TableHeading
                                                name="position"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Position
                                            </TableHeading>
                                            <TableHeading
                                                name="category"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Category
                                            </TableHeading>
                                            <th className="px-3 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.title}
                                                    placeholder="Title"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("title", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("title", e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.category}
                                                    onChange={(e) =>
                                                        searchFieldChanged("category", e.target.value)
                                                    }
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="0">Experience</option>
                                                    <option value="1">Education</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exps.data.map((experience) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={experience.id}
                                            >
                                                <td className="px-3 py-2">{experience.id}</td>
                                                <td className="px-3 py-2">
                                                    <img src={experience.src} style={{ width: 60 }} />
                                                </td>
                                                <th className="px-3 py-2">
                                                    {experience.title} <br />
                                                    {experience.subtitle}
                                                </th>
                                                <td className="px-3 py-2">
                                                    {experience.alt}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {experience.we_date}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <span
                                                        className={
                                                            "px-3 py-2 w-24 h-12 text-white rounded-full " +
                                                            EXPERIENCE_POSITION_CLASS_MAP[experience.position]
                                                        }
                                                    >
                                                        {EXPERIENCE_POSITION_TEXT_MAP[experience.position]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-2 py-2 rounded-full text-white " +
                                                            EXPERIENCE_CATEGORY_CLASS_MAP[experience.category]
                                                        }
                                                    >
                                                        {EXPERIENCE_CATEGORY_TEXT_MAP[experience.category]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link
                                                        href={route("experience.edit", experience.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) => deleteExperience(experience)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={exps.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
