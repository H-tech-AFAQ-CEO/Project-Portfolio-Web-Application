'use client';

import { motion } from 'framer-motion';
import { User, Bell, Lock, Users, Save } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Project Manager',
    notifications: {
      approvals: true,
      updates: true,
      weekly: true,
    },
  });

  const handleSave = () => {
    console.log('Settings saved:', formData);
  };

  return (
    <MainLayout
      title="Settings"
      breadcrumbs={[{ label: 'Settings' }]}
    >
      <motion.div className="max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
        {/* Profile Section */}
        <motion.div className="card-elevated p-8 mb-6" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{formData.name}</h3>
              <p className="text-sm text-muted-foreground">{formData.role}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option>Project Manager</option>
                <option>Portfolio Manager</option>
                <option>Program Director</option>
                <option>Executive</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div className="card-elevated p-8 mb-6" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          </div>

          <div className="space-y-4">
            {[
              { key: 'approvals', label: 'Approval Notifications', desc: 'Get notified when approvals need your action' },
              { key: 'updates', label: 'Project Updates', desc: 'Receive updates on project progress' },
              { key: 'weekly', label: 'Weekly Digest', desc: 'Get a weekly summary of your portfolio' },
            ].map((setting) => (
              <div key={setting.key} className="flex items-start justify-between p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.desc}</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications[setting.key as keyof typeof formData.notifications]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notifications: {
                          ...formData.notifications,
                          [setting.key]: e.target.checked,
                        },
                      })
                    }
                    className="w-5 h-5 rounded accent-primary"
                  />
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div className="card-elevated p-8 mb-6" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Security & Privacy</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted/30 transition-colors border border-border">
              <p className="font-medium text-foreground">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted/30 transition-colors border border-border">
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted/30 transition-colors border border-border">
              <p className="font-medium text-foreground">API Keys</p>
              <p className="text-sm text-muted-foreground">Manage your API keys and integrations</p>
            </button>
          </div>
        </motion.div>

        {/* Team Management */}
        <motion.div className="card-elevated p-8 mb-6" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Team Management</h3>
          </div>

          <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Invite Team Members
          </button>
        </motion.div>

        {/* Save Button */}
        <motion.div className="flex justify-end gap-3" variants={itemVariants}>
          <button className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 btn-hover"
          >
            <Save size={18} />
            Save Changes
          </button>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
