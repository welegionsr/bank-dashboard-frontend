'use client';
import '@/styles/UserList/UserRowActions.css';
import { Button, ButtonGroup } from "react-bootstrap";
import { ListUl, PencilSquare, Trash } from "react-bootstrap-icons";

export default function UserRowActions({onEdit, onDelete, onInfo}) {
    return (
        <ButtonGroup className='actions-group'>
            <Button className='action-btn' variant='secondary' onClick={onInfo}><ListUl size={17} /></Button>
            <Button className='action-btn' variant='secondary' onClick={onEdit}><PencilSquare size={17} /></Button>
            <Button className='action-btn delete-btn' variant="danger" onClick={onDelete}><Trash size={17} /></Button>
        </ButtonGroup>
    );
}