import { AimOutlined, SolutionOutlined, SettingOutlined, FileAddOutlined, TeamOutlined } from '@ant-design/icons';
import { FaBox } from 'react-icons/fa';

const SidebarLinks = () => [
  {
    label: "Usuarios",
    icon: <TeamOutlined />,
    subMenu: [
      {
        label: "Administrar Perfil",
        to: "/personnel/manageEmployees",
      },
      {
        label: "Administrar roles",
        to: "/roles",
      },
      {
        label: "Administrar permisos",
        to: "/personnel/healthcare-professionals-registry",
      },
    ],
  },
  {
    label: "Productos",
    icon: <FaBox />,
    subMenu: [
      {
        label: "Gestionar Categoria",
        to: "/categoria",
      },
      {
        label: "Gestionar Categorias de Colores",
        to: "/categoria_color",
      },
      {
        label: "Gestionar Color",
        to: "/color",
      },
      {
        label: "Gestionar Talla",
        to: "/talla",
      },
      {
        label: "Gestionar Marca",
        to: "/marca",
      },
      {
        label: "Gestionar Producto",
        to: "/producto",
      }
    ],
  },
  {
    label: "Compras y Ventas",
    icon: <SettingOutlined />,
    subMenu: [
      {
        label: "Notas de ingreso",
        to: "/notaIngreso",
      },
      {
        label: "Notas de venta",
        to: "/ventas",
      },
      {
        label: "Tipo de pago",
        to: "/tipoPago",
      }
    ],
  }
];

export default SidebarLinks;
