import React, { useState, useEffect } from 'react';
import {
    Container, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Chip, LinearProgress, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/PageHeader';
import { getAllUsers, deleteUser } from '../../../firebase/usersService';
import type { User } from '../types/User';
import DesktopOnly from '../../../components/DesktopOnly';
import './UsersManagement.css';

const UsersManagement: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("שגיאה בטעינת המשתמשים");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (email: string) => {
        // הודעה מפורטת למשתמש
        if (window.confirm("האם למחוק את המשתמש?\n\nשים לב: המשתמש יימחק מרשימת הנתונים, אך החשבון שלו (Auth) לא יימחק לצמיתות כי נדרשת מערכת צד-שרת לכך.")) {
            try {
                await deleteUser(email);
                setUsers(prev => prev.filter(user => user.id !== email));
            } catch (error) {
                console.error("Error deleting:", error);
                alert("שגיאה במחיקת המשתמש");
            }
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
        <DesktopOnly>
            <Container maxWidth="lg" className="management-container">
                <PageHeader
                    title="ניהול משתמשים"
                    buttonText="משתמש חדש"
                    onButtonClick={() => navigate('/users/new')}
                />

                <TableContainer component={Paper} elevation={3}>
                    {loading && <Box className="loading-box"><LinearProgress /></Box>}

                    {!loading && users.length === 0 ? (
                        <Box className="empty-state">אין משתמשים במערכת</Box>
                    ) : (
                        <Table>
                            <TableHead className="table-head-row">
                                <TableRow>
                                    <TableCell><b>מייל (מזהה)</b></TableCell>
                                    <TableCell><b>שם מלא</b></TableCell>
                                    <TableCell align="center"><b>סוג משתמש</b></TableCell>
                                    <TableCell align="center"><b>פעולות</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="email-cell">{user.id}</TableCell>
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={user.userType}
                                                color={getUserTypeColor(user.userType) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => navigate(`/users/edit/${user.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(user.id)}>
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
        </DesktopOnly>
    );
};

export default UsersManagement;