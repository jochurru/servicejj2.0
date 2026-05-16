import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const { div: MotionDiv, article: MotionArticle, form: MotionForm, span: MotionSpan } = motion;
import { Package, Pencil, Trash2, Upload } from 'lucide-react';
import Swal from 'sweetalert2';
import { serviceApi } from '../../services/api';
import ImageDropzone from '../../components/admin/ImageDropzone';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const TABS = [
    { id: 'carga', label: 'Carga de equipos' },
    { id: 'inventario', label: 'Modificar ventas' },
];

const CATEGORIAS = ['Equipos', 'Accesorios', 'Repuestos', 'Climatización'];

const formatPrecio = (n) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(n);

const emptyForm = () => ({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: 'Equipos',
});

const AdminComercial = () => {
    const [tab, setTab] = useState('carga');
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(emptyForm());
    const [imagenFile, setImagenFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const cargarProductos = useCallback(async () => {
        setLoading(true);
        try {
            const lista = await serviceApi.getProductosAdmin();
            setProductos(lista);
        } catch (err) {
            Swal.fire('Error', err.message || 'No se pudo cargar el inventario', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    const handleFileSelect = (file) => {
        setImagenFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    const resetForm = () => {
        setForm(emptyForm());
        setImagenFile(null);
        setPreview(null);
        setEditingId(null);
    };

    const buildFormData = () => {
        const fd = new FormData();
        fd.append('nombre', form.nombre);
        fd.append('descripcion', form.descripcion);
        fd.append('precio', form.precio);
        fd.append('stock', form.stock);
        fd.append('categoria', form.categoria);
        if (imagenFile) fd.append('imagen', imagenFile);
        return fd;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!imagenFile) {
            Swal.fire('Imagen requerida', 'Subí una foto del equipo', 'warning');
            return;
        }
        setSaving(true);
        try {
            await serviceApi.createProducto(buildFormData());
            Swal.fire({ icon: 'success', title: 'Equipo publicado', timer: 1800, showConfirmButton: false });
            resetForm();
            await cargarProductos();
            setTab('inventario');
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (p) => {
        setEditingId(p.id);
        setForm({
            nombre: p.nombre || '',
            descripcion: p.descripcion || '',
            precio: String(p.precio ?? ''),
            stock: String(p.stock ?? ''),
            categoria: p.categoria || 'Equipos',
        });
        setPreview(p.imagen || null);
        setImagenFile(null);
        setTab('inventario');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingId) return;
        setSaving(true);
        try {
            await serviceApi.updateProducto(editingId, buildFormData());
            Swal.fire({ icon: 'success', title: 'Producto actualizado', timer: 1800, showConfirmButton: false });
            resetForm();
            await cargarProductos();
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar producto?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#a1a1aa',
            confirmButtonText: 'Eliminar',
        });
        if (!result.isConfirmed) return;
        try {
            await serviceApi.deleteProducto(id);
            await cargarProductos();
            if (editingId === id) resetForm();
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    };

    return (
        <section>
            <MotionDiv
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-10 border-b border-zinc-200 pb-1"
            >
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                            tab === t.id ? 'text-black' : 'text-zinc-400 hover:text-black'
                        }`}
                    >
                        {tab === t.id && (
                            <MotionSpan
                                layoutId="comercial-tab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                            />
                        )}
                        {t.label}
                    </button>
                ))}
            </MotionDiv>

            <AnimatePresence mode="wait">
                {tab === 'carga' ? (
                    <MotionForm
                        key="carga"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        onSubmit={handleCreate}
                        className="max-w-2xl space-y-6"
                    >
                        <h2 className="font-newtown italic uppercase text-2xl text-black">
                            Nuevo equipo en vidriera
                        </h2>
                        <ImageDropzone
                            preview={preview}
                            onFileSelect={handleFileSelect}
                            disabled={saving}
                        />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="label-field">Nombre</label>
                                <input
                                    className="input-field"
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-field">Categoría</label>
                                <select
                                    className="input-field"
                                    value={form.categoria}
                                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                >
                                    {CATEGORIAS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label-field">Precio (ARS)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="input-field"
                                    value={form.precio}
                                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-field">Stock</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="input-field"
                                    value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label-field">Descripción técnica</label>
                            <textarea
                                className="input-field min-h-[100px]"
                                value={form.descripcion}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                                rows={4}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary w-full sm:w-auto disabled:opacity-50"
                        >
                            <Upload size={18} />
                            {saving ? 'Subiendo...' : 'Publicar en vidriera'}
                        </button>
                    </MotionForm>
                ) : (
                    <MotionDiv
                        key="inventario"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                    >
                        <h2 className="font-newtown italic uppercase text-2xl text-black mb-6">
                            Inventario publicado
                        </h2>

                        {editingId && (
                            <form
                                onSubmit={handleUpdate}
                                className="mb-10 p-6 border border-black rounded-2xl bg-zinc-50 space-y-4"
                            >
                                <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                                    Editando producto
                                </p>
                                <ImageDropzone
                                    preview={preview}
                                    onFileSelect={handleFileSelect}
                                    disabled={saving}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        className="input-field"
                                        placeholder="Nombre"
                                        value={form.nombre}
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="Precio"
                                        value={form.precio}
                                        onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="Stock"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                    />
                                    <select
                                        className="input-field"
                                        value={form.categoria}
                                        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                    >
                                        {CATEGORIAS.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <textarea
                                    className="input-field"
                                    placeholder="Descripción"
                                    value={form.descripcion}
                                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                                    rows={3}
                                />
                                <div className="flex gap-3">
                                    <button type="submit" disabled={saving} className="btn-primary">
                                        Guardar cambios
                                    </button>
                                    <button type="button" onClick={resetForm} className="btn-secondary">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}

                        {loading ? (
                            <LoadingSpinner label="Cargando inventario..." />
                        ) : productos.length === 0 ? (
                            <p className="text-zinc-400 text-center py-16">
                                No hay productos publicados. Usá la pestaña de carga.
                            </p>
                        ) : (
                            <MotionDiv
                                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.05 } },
                                }}
                            >
                                {productos.map((p) => (
                                    <MotionArticle
                                        key={p.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 12 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        whileHover={{ y: -4 }}
                                        className="border border-zinc-200 rounded-2xl overflow-hidden bg-white hover:border-black transition-colors"
                                    >
                                        <div className="aspect-4/3 bg-zinc-100 overflow-hidden">
                                            {p.imagen ? (
                                                <img
                                                    src={p.imagen}
                                                    alt={p.nombre}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                    <Package size={40} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                                                {p.categoria}
                                            </span>
                                            <h3 className="font-newtown text-lg uppercase italic mt-1 mb-1">
                                                {p.nombre}
                                            </h3>
                                            <p className="text-lg font-semibold text-black mb-1">
                                                {formatPrecio(p.precio)}
                                            </p>
                                            <p className="text-xs text-zinc-500 mb-4">
                                                Stock: {p.stock ?? 0}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => startEdit(p)}
                                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wider border border-zinc-200 rounded-full hover:border-black transition-colors"
                                                >
                                                    <Pencil size={14} /> Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(p.id)}
                                                    className="p-2 border border-zinc-200 rounded-full hover:border-red-500 hover:text-red-600 transition-colors"
                                                    aria-label="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </MotionArticle>
                                ))}
                            </MotionDiv>
                        )}
                    </MotionDiv>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AdminComercial;