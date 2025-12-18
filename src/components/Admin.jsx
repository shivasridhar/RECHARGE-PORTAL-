import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navigation from './Navigation';

const Admin = ({ navigateTo }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [form, setForm] = useState({ name: '', price: '', validity: '', data: '', calls: 'Unlimited', sms: 'Unlimited', features: '', popular: false });

  // Fetch plans from API
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/plans');
      const data = await response.json();
      if (data.success) {
        setCards(data.plans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setForm({ name: '', price: '', validity: '', data: '', calls: 'Unlimited', sms: 'Unlimited', features: '', popular: false });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error('Name and price are required');
      return;
    }

    try {
      const features = form.features ? form.features.split(',').map(f => f.trim()).filter(f => f) : [];
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          features
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Plan created successfully');
        fetchPlans();
        resetForm();
      } else {
        toast.error(data.message || 'Failed to create plan');
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      toast.error('Failed to create plan');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/admin/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Plan updated successfully');
        fetchPlans();
        setEditingId(null);
        setEditingData({});
      } else {
        toast.error(data.message || 'Failed to update plan');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('Failed to update plan');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;

    try {
      const response = await fetch(`/api/admin/plans/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Plan deleted successfully');
        fetchPlans();
      } else {
        toast.error(data.message || 'Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error('Failed to delete plan');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navigation currentPage="admin" />
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Admin Panel</h1>
          <p className="text-gray-400">Manage recharge cards: create, edit, and delete.</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading plans...</p>
          </div>
        ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-600/40 rounded-2xl p-6 shadow-lg"
            >
              {editingId === card._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingData.name || card.name}
                    onChange={(e) => setEditingData({...editingData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editingData.price || card.price}
                    onChange={(e) => setEditingData({...editingData, price: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    value={editingData.validity || card.validity}
                    onChange={(e) => setEditingData({...editingData, validity: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    placeholder="Validity"
                  />
                  <input
                    type="text"
                    value={editingData.data || card.data}
                    onChange={(e) => setEditingData({...editingData, data: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    placeholder="Data"
                  />
                  <div className="flex space-x-3">
                    <button
                      className="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                      onClick={() => handleUpdate(card._id)}
                    >
                      Save
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                      onClick={() => {
                        setEditingId(null);
                        setEditingData({});
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{card.name}</h3>
                    <span className="text-lg font-semibold text-orange-400">{card.price}</span>
                  </div>
                  <p className="text-sm text-gray-300">Validity: {card.validity}</p>
                  <p className="text-sm text-gray-300">Data: {card.data}</p>
                  <p className="text-sm text-gray-300">Calls: {card.calls}</p>
                  <p className="text-sm text-gray-300">SMS: {card.sms}</p>
                  {card.features && card.features.length > 0 && (
                    <p className="text-sm text-gray-400">Features: {card.features.join(', ')}</p>
                  )}
                  <div className="flex space-x-3 mt-4">
                    <button
                      className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                      onClick={() => {
                        setEditingId(card._id);
                        setEditingData({ name: card.name, price: card.price, validity: card.validity, data: card.data, calls: card.calls, sms: card.sms });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                      onClick={() => handleDelete(card._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-600/40 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Create new plan</h3>
            <form className="space-y-3" onSubmit={handleAdd}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Plan name"
                required
              />
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Price (e.g., ₹199)"
                required
              />
              <input
                type="text"
                value={form.validity}
                onChange={(e) => setForm({ ...form, validity: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Validity (e.g., 28 days)"
                required
              />
              <input
                type="text"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Data (e.g., 1.5 GB/day)"
                required
              />
              <input
                type="text"
                value={form.calls}
                onChange={(e) => setForm({ ...form, calls: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Calls (e.g., Unlimited)"
              />
              <input
                type="text"
                value={form.sms}
                onChange={(e) => setForm({ ...form, sms: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="SMS (e.g., Unlimited)"
              />
              <input
                type="text"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Features (comma separated)"
              />
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span>Mark as popular</span>
              </label>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
              >
                Add plan
              </button>
            </form>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Admin;


