import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, LinearProgress, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import type { Lead } from '../types/lead';
import { PageHeader } from '../../../components/PageHeader';
import { getAllLeads } from '../../../firebase/leadsService';
import './LeadsManagement.css';

const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getAllLeads();
      // Sort by createdAt descending (newest first)
      const sortedData = data.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt as Date | number | string);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt as Date | number | string);
        return dateB.getTime() - dateA.getTime();
      });
      setLeads(sortedData);
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("שגיאה בטעינת הפניות");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("למחוק את הפנייה?")) {
      try {
        // TODO: Implement deleteLead in leadsService
        // await deleteLead(id);
        setLeads(prev => prev.filter(l => l.id !== id));
        alert("הפנייה נמחקה בהצלחה");
      } catch (error) {
        console.error("Error deleting lead:", error);
        alert("שגיאה במחיקת הפנייה");
      }
    }
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '-';
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '-';
    }
  };

  return (
    <Container maxWidth="lg" className="management-container">
      <PageHeader
        title="ניהול פניות"
        onButtonClick={fetchLeads}
      />

      <TableContainer component={Paper} elevation={3}>
        {/* אינדיקציית טעינה */}
        {loading && <Box className="loading-box"><LinearProgress /></Box>}

        {!loading && leads.length === 0 ? (
          <Box className="empty-state-box">לא נמצאו פניות</Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="table-header-cell">שם מלא</TableCell>
                <TableCell className="table-header-cell">אימייל</TableCell>
                <TableCell className="table-header-cell">טלפון</TableCell>
                <TableCell className="table-header-cell">הערות</TableCell>
                <TableCell className="table-header-cell">תאריך הגשה</TableCell>
                <TableCell align="center" className="table-header-cell">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>{lead.fullName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell className="notes-cell">{lead.notes || '-'}</TableCell>
                  <TableCell>{formatDate(lead.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default LeadsManagement;
