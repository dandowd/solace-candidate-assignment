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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onSearchChange} value={searchTerm} />
        <button onClick={onClickReset}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
