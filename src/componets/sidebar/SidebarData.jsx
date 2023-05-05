import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
export const SidebarData = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  {
    title: "Gestión",
    icon: <FiIcons.FiTrello />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Ingresos",
        path: "/gestion/ingreso",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Gastos",
        path: "/gestion/gasto",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Planificación",
        path: "/gestion/planes",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },

  {
    title: "Reportes",
    icon: <FiIcons.FiLayers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Ingresos y Gastos",
        path: "/report/EdaCuenta",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Planes Mensuales",
        path: "/report/planes",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Administración",
    icon: <AiIcons.AiFillBank />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Usuarios",
        path: "/admin/users",
        icon: <RiIcons.RiParentFill />,
        cName: "sub-nav",
      },
      {
        title: "Tipo de Ingresos",
        path: "/admin/tipoIngreso",
        icon: <FaIcons.FaUserTie />,
        cName: "sub-nav",
      },
      {
        title: "Grupo de Gastos",
        path: "/admin/grupoGasto",
        icon: <FaIcons.FaTruckPickup />,
        cName: "sub-nav",
      },
      {
        title: "Tipo de Gastos",
        path: "/admin/tipoGasto",
        icon: <FaIcons.FaTruckPickup />,
        cName: "sub-nav",
      },
      {
        title: "Condiciones Gastos",
        path: "/admin/condicionGasto",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Condiciones Ingresos",
        path: "/admin/condicionIngreso",
        icon: <FaIcons.FaClipboardList />,
        cName: "sub-nav",
      },
      {
        title: "Contactos",
        path: "/admin/contact",
        icon: <FaIcons.FaClipboardList />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Accesos",
    icon: <FaIcons.FaUserFriends />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Logín",
        path: "/acceso/login",
        icon: <FiIcons.FiLogIn />,
      },
      {
        title: "Cambiar Clave",
        path: "/acceso/cambioClave",
        icon: <FaIcons.FaUsersCog />,
      },
      {
        title: "Registro",
        path: "/acceso/register",
        icon: <FaIcons.FaUsersCog />,
      },
    ],
  },

  {
    title: "Contacto",
    path: "/contact",
    icon: <FaIcons.FaPhone />,
  },
  {
    title: "Salír",
    path: "/salir",
    icon: <FiIcons.FiLogOut />,
  },
];
