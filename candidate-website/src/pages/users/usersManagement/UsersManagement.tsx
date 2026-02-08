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
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <PageHeader
                    title="ניהול משתמשים"
                    buttonText="משתמש חדש"
                    onButtonClick={() => navigate('/users/new')}
                />

                <TableContainer component={Paper} elevation={3}>
                    {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}

                    {!loading && users.length === 0 ? (
                        <Box sx={{ p: 3, textAlign: 'center' }}>אין משתמשים במערכת</Box>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>מייל (מזהה)</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>שם מלא</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>סוג משתמש</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell sx={{ direction: 'ltr', textAlign: 'right' }}>{user.id}</TableCell>
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