import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, message, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EmployeeDetail from './EmployeeDetail';
import RegisterEmploye from './RegisterEmployee';
import { getAllEmployees } from '../../../api/apiService'; // Ajusta la importación según la ubicación de tu archivo de API

const { Title } = Typography;

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                message.error('Error al obtener empleados');
            }
        };

        fetchEmployees();
    }, []);

    const handleShowDetail = (record) => {
        setSelectedEmployee(record);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedEmployee(null);
    };

    const handleDeleteConfirm = () => {
        setEmployees(employees.filter((employee) => employee.empleado_id !== employeeToDelete.empleado_id));
        setDeleteModalVisible(false);
        message.success('Empleado eliminado exitosamente');
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'empleado_id',
            key: 'empleado_id',
        },
        {
            title: 'Nombre Completo',
            key: 'nombre_completo',
            render: (text, record) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
        },
        {
            title: 'Profesión',
            dataIndex: 'profesion',
            key: 'profesion',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (text) => (text ? 'Activo' : 'Inactivo'),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleShowDetail(record)}><EditOutlined /></Button>
                    <Button
                        style={{
                            backgroundColor: '#F44336',
                            color: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => { setEmployeeToDelete(record); setDeleteModalVisible(true); }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        }
    ];

    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
            <Title level={3} className="text-center">Administrar Empleados</Title>
            <div className="flex justify-end mb-6">
                <RegisterEmploye />
            </div>
            <Table
                columns={columns}
                dataSource={employees}
                rowKey="empleado_id"
                pagination={{ pageSize: 4, size: 'small' }}
            />
            <Modal
                title="Eliminar Empleado"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            >
                <p>¿Está seguro que desea eliminar a este empleado?</p>
            </Modal>
            {selectedEmployee && (
                <EmployeeDetail
                    visible={isDetailModalVisible}
                    onClose={handleDetailModalClose}
                    employee={selectedEmployee ? console.log(selectedEmployee) : console.log("nada joven")}
                />
            )}
        </div>
    );
};

export default ManageEmployees;
