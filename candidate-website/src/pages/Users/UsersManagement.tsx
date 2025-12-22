import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

// filepath: c:/Users/yuval/frontend-2025/FrontendCourse-2026-A/candidate-website/src/pages/Users/UsersManagement.tsx

interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    userType: string;
}

const UsersManagement: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('users');
        if (saved) {
            setUsers(JSON.parse(saved));
        } else {
            // Demo data if no users exist
            setUsers([
                { id: "1", fullName: "ישראל ישראלי", email: "israel@test.com", password: "123456", userType: "מועמד" },
                { id: "2", fullName: "דנה כהן", email: "dana@test.com", password: "abcdef", userType: "סטודנט" }
            ]);
        }
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm("למחוק את המשתמש?")) {
            const updated = users.filter(user => user.id !== id);
            setUsers(updated);
            localStorage.setItem('users', JSON.stringify(updated));
        }
    };

    const getUserTypeColor = (userType: string) => {
        switch (userType) {
            case 'מועמד': return 'info';
            case 'סטודנט': return 'primary';
            case 'בוגר': return 'success';
            case 'מנהל מערכת': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>ניהול משתמשים</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/users/new')}>
                    משתמש חדש
                </Button>
            </div>
            <br />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>שם מלא</TableCell>
                            <TableCell>מייל</TableCell>
                            <TableCell>סיסמא</TableCell>
                            <TableCell align="center">סוג משתמש</TableCell>
                            <TableCell align="center">פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell align="center">
                                    <Chip label={user.userType} color={getUserTypeColor(user.userType) as any} size="small" />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => navigate(`/users/edit/${user.id}`)}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(user.id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UsersManagement;