

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useFamilyContext } from '@/contexts/familyContext';

export function useFamilyTasks() {
  const { family, isAdmin } = useFamilyContext();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const loadUserTasks = async () => {
    try {
      const [assignedRes, unassignedRes] = await Promise.all([
        api.get(`/task/assigned/uncompleted/${family?.idFamily}`),
        api.get(`/task/unassigned/${family?.idFamily}`),
      ])

      console.log("Tareas pendientes:", assignedRes.data.tasks)
      console.log("Tareas no asignadas:", unassignedRes.data.tasks)

      setTasks([
        ...assignedRes.data.tasks,
        ...unassignedRes.data.tasks,
      ])

    } catch (err) {
        setError("Error cargando las tareas");
      console.error("Error cargando tareas:", err)
    } finally {
        setLoading(false);
    }
  }

    const loadAdminTasks = async () => {
    try {
      const [assignedRes, unassignedRes, underReviewRes] = await Promise.all([
        api.get(`/task/assigned/uncompleted/admin/${family?.idFamily}`),
        api.get(`/task/unassigned/${family?.idFamily}`),
        api.get(`/task/underreview/${family?.idFamily}`),
      ])

      console.log("Tareas pendientes:", assignedRes.data.tasks)
      console.log("Tareas no asignadas:", unassignedRes.data.tasks)
      console.log("Tareas underreview:", underReviewRes.data.tasks)

      setTasks([
        ...assignedRes.data.tasks,
        ...unassignedRes.data.tasks,
        ...underReviewRes.data.tasks,
      ])

    } catch (err) {
      setError("Error cargando las tareas");
      console.error("Error cargando tareas:", err)
    } finally {
        setLoading(false);
    }
  }

  const loadTasks = async () => {
    setLoading(true);
    setError(null); 
    if (isAdmin) {
      loadAdminTasks()
    } else {
      loadUserTasks()
    }
  }

  useEffect(() => {
    if (!family?.idFamily) return

    loadTasks()
  }, [family])

  return {
    tasks,
    loading,
    error,
    reloadTasks: loadTasks,
  };
}