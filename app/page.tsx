// app/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([
    { date: '2025-07-01', activity: 'Running', duration: 30 },
    { date: '2025-07-02', activity: 'Cycling', duration: 45 },
  ]);
  const [newWorkout, setNewWorkout] = useState({ date: '', activity: '', duration: '' });

  const stepsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [5000, 8000, 7500, 6000, 9000, 10000, 11000],
        backgroundColor: 'rgba(34,197,94,0.5)',
        borderColor: 'rgba(34,197,94,1)',
        borderWidth: 2,
      },
    ],
  };

  const caloriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [200, 300, 250, 270, 400, 500, 550],
        backgroundColor: 'rgba(239,68,68,0.5)',
        borderColor: 'rgba(239,68,68,1)',
        borderWidth: 2,
      },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkouts([...workouts, { ...newWorkout, duration: Number(newWorkout.duration) }]);
    setNewWorkout({ date: '', activity: '', duration: '' });
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Fitness Tracker Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Weekly Steps</h2>
          <Bar data={stepsData} />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Calories Burned</h2>
          <Line data={caloriesData} />
        </div>
      </motion.div>

      <motion.div
        className="bg-white p-6 rounded-2xl shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Log New Workout</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <input
            type="date"
            className="border p-2 rounded"
            value={newWorkout.date}
            onChange={e => setNewWorkout({ ...newWorkout, date: e.target.value })}
            required
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Activity"
            value={newWorkout.activity}
            onChange={e => setNewWorkout({ ...newWorkout, activity: e.target.value })}
            required
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Duration (min)"
            value={newWorkout.duration}
            onChange={e => setNewWorkout({ ...newWorkout, duration: e.target.value })}
            required
          />
          <button type="submit" className="col-span-3 bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Add Workout
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Workout History</h3>
          <ul className="space-y-2">
            {workouts.map((workout, idx) => (
              <li key={idx} className="p-2 border rounded">
                {workout.date} - {workout.activity} for {workout.duration} min
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </main>
  );
}
