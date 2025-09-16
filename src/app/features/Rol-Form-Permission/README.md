# Componente Rol-Form-Permission

Este componente gestiona las relaciones entre roles, formularios y permisos en el sistema, proporcionando una interfaz intuitiva que oculta los IDs internos y muestra únicamente los nombres descriptivos.

## 📋 Características

- **Visualización Clara**: Muestra únicamente nombres descriptivos en lugar de IDs numéricos
- **Gestión Completa**: Permite crear, editar, eliminar y consultar relaciones rol-formulario-permiso
- **Interfaz Moderna**: Utiliza PrimeNG para una experiencia de usuario profesional
- **Búsqueda Avanzada**: Filtrado global por cualquier campo visible
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Validación**: Formularios con validación en tiempo real

## 🏗️ Estructura de Archivos

```
src/app/features/Rol-Form-Permission/
├── rol-form-permission.component.ts      # Componente principal
├── rol-form-permission.component.html    # Template del componente
├── rol-form-permission.component.scss    # Estilos del componente
├── rol-form-permission.service.ts        # Servicio para API
├── rol-form-permission.model.ts          # Interfaces TypeScript
└── rol-form-permission.routes.ts         # Configuración de rutas
```

## 🔗 API Endpoint

El componente se conecta con la API REST:
- **URL Base**: `https://localhost:7286/api/RolFormPermission`
- **Estructura de datos**:
```json
{
  "id": 1,
  "rolid": 2,
  "formid": 1,
  "permissionid": 1,
  "permissionName": "Leer",
  "rolName": "Usuario",
  "formName": "Formulario de acuerdo de pago"
}
```

## 📱 Funcionalidades

### 1. Visualización de Datos
- Tabla con paginación automática
- Columnas: Rol, Formulario, Permiso
- Tags visuales para mejor legibilidad
- Mensaje de "sin datos" personalizado

### 2. Gestión de Registros
- **Crear**: Formulario modal con dropdowns para selección
- **Editar**: Modificación de registros existentes
- **Eliminar**: Confirmación antes de eliminación
- **Buscar**: Filtro global en tiempo real

### 3. Validaciones
- Campos obligatorios marcados con asterisco rojo
- Mensajes de error contextuales
- Validación en tiempo real
- Deshabilitación de botones con formularios inválidos

## 🎨 Interfaz de Usuario

### Elementos Visuales
- **Tags de Rol**: Color azul con degradado
- **Tags de Permiso**: Color verde con degradado
- **Botones de Acción**: Íconos intuitivos (editar/eliminar)
- **Diálogos Modales**: Diseño limpio y profesional

### Responsive Design
- Adaptación automática a dispositivos móviles
- Redistribución de elementos en pantallas pequeñas
- Optimización de espaciado y tipografía

## 🚀 Uso del Componente

### Navegación
El componente está disponible en la ruta:
```
/rol-form-permission
```

### Operaciones Disponibles

1. **Ver Lista**: Visualización automática al cargar el componente
2. **Crear Nuevo**: Botón "Nuevo" en la barra de herramientas
3. **Editar**: Icono de lápiz en cada fila
4. **Eliminar**: Icono de papelera con confirmación
5. **Buscar**: Campo de búsqueda en la barra superior

## 🔧 Configuración Técnica

### Dependencias PrimeNG
- `TableModule`: Tabla de datos
- `ButtonModule`: Botones interactivos
- `DialogModule`: Ventanas modales
- `DropdownModule`: Selectores desplegables
- `ToastModule`: Notificaciones
- `ConfirmDialogModule`: Confirmaciones

### Servicios Angular
- `HttpClient`: Comunicación con API
- `FormBuilder`: Construcción de formularios reactivos
- `MessageService`: Gestión de mensajes
- `ConfirmationService`: Diálogos de confirmación

## 📊 Modelo de Datos

### Interfaces Principales
- `RolFormPermission`: Datos completos de la API
- `RolFormPermissionDisplay`: Solo datos para visualización
- `CreateRolFormPermission`: Datos para creación
- `UpdateRolFormPermission`: Datos para actualización

### Transformación de Datos
El componente transforma automáticamente los datos de la API para mostrar solo información relevante al usuario, ocultando los IDs internos del sistema.

## 🔐 Características de Seguridad

- Validación de formularios en cliente
- Confirmación de eliminaciones críticas
- Manejo de errores de API
- Mensajes informativos para el usuario

## 🎯 Beneficios

1. **Usabilidad**: Interfaz intuitiva que no expone complejidad técnica
2. **Mantenibilidad**: Código modular y bien estructurado
3. **Escalabilidad**: Fácil extensión para nuevas funcionalidades
4. **Consistencia**: Sigue patrones de diseño del sistema

---

**Versión**: 1.0.0  
**Última actualización**: 15 de septiembre de 2025  
**Desarrollado para**: Sistema de Gestión de Multas