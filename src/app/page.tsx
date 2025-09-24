"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { getData } from "./requests/getData";
import { AdvocatesResponse } from "@/types/AdvocatesResponse";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocatesResponse>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocatesResponse>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    getData<AdvocatesResponse>("/api/advocates").then((response) => {
        setAdvocates(response);
        setFilteredAdvocates(response);
    });
  }, []);

  // Debounced server search function (1 second)
  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        try {
          const response = await getData<AdvocatesResponse>(`/api/advocates?search=${encodeURIComponent(term)}`);
          setFilteredAdvocates(response);
        } catch (err) {
          console.error("Failed to fetch advocates:", err);
        }
      }, 1000),
    []
  );

  useEffect(() => {
    // Cleanup debounced calls on unmount
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const term = value.trim();
    if (!term) {
      debouncedSearch.cancel();
      setFilteredAdvocates(advocates);
      return;
    }

    debouncedSearch(term);
  };

  const onClickReset = () => {
    debouncedSearch.cancel();
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Solace Advocates</h1>
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <span id="search-term" className="font-medium text-gray-900">{searchTerm}</span>
          </p>
        </header>

        <div className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label htmlFor="search" className="sr-only">Search advocates</label>
            <input
              id="search"
              placeholder="Search by name, city, degree, or specialty..."
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:max-w-md"
              onChange={onSearchChange}
              value={searchTerm}
            />
            <button
              type="button"
              onClick={onClickReset}
              className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Reset Search
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">First Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Last Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">City</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Degree</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Specialties</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Years of Experience</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Phone Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAdvocates.map((advocate, idx) => {
                  return (
                    <tr key={advocate.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{advocate.firstName}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{advocate.lastName}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{advocate.city}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{advocate.degree}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex flex-wrap gap-2">
                          {advocate.specialties.map((s) => (
                            <span key={s} className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{advocate.yearsOfExperience}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{advocate.phoneNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
