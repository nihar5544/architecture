"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import BuildingLoading from "@/components/loader/pageLoader";

function InquiryDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
      .get("/api/contect")
      .then((res) => {
        setLoading(false);
        setData(res?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to fetch data");
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    setDeleteLoading(true);
    axios
      .delete(`/api/contect/${id}`)
      .then((res) => {
        toast.success("Record deleted successfully");
        setDeleteLoading(false);
        getData();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setDeleteLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center h-screen p-6">
      <h1 className="text-5xl font-medium my-10">Inquiry Details</h1>
      {loading ? (
        <BuildingLoading />
      ) : (
        <TableContainer component={Paper} className="max-w-6xl w-full">
          <Table aria-label="projects table">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Email</TableCell>
                <TableCell className="font-bold">Subject</TableCell>
                <TableCell className="font-bold">Phone</TableCell>
                <TableCell className="font-bold">Description</TableCell>
                <TableCell className="font-bold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row) => (
                  <TableRow
                    key={row._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(row._id)}
                        variant="outlined"
                        color="error"
                        disabled={deleteLoading}
                        startIcon={
                          deleteLoading ? <CircularProgress size={20} /> : null
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default InquiryDetails;
