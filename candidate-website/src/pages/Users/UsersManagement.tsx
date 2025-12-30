import React, { useState, useEffect } from 'react';
import { 
  Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

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
            // נתונים ראשוניים לדוגמה אם אין כלום
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
        <Container maxWidth="lg">
            {/* כותרת וכפתור הוספה */}
            <PageHeader 
                title="ניהול משתמשים" 
                buttonText="משתמש חדש"
                onButtonClick={() => navigate('/users/new')}
            />

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell><b>שם מלא</b></TableCell>
                            <TableCell><b>מייל</b></TableCell>
                            <TableCell><b>סיסמא</b></TableCell>
                            <TableCell align="center"><b>סוג משתמש</b></TableCell>
                            <TableCell align="center"><b>פעולות</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.password}</TableCell>
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
            </TableContainer>
        </Container>
    );
};

export default UsersManagement;