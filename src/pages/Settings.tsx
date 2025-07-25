import { useState } from "react";
import { Bell, Smartphone, Mail, Palette, DollarSign, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("auto");
  const [currency, setCurrency] = useState("EUR");

  const handleTestNotification = () => {
    // Mock test notification
    console.log("Test notification sent");
  };

  const handleDeleteAccount = () => {
    // Mock account deletion
    console.log("Account deletion requested");
  };

  const handleLogout = () => {
    // Mock logout
    console.log("Logout requested");
  };

  return (
    <div className="min-h-screen bg-background md:pl-64">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Account Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            <div>
              <h3 className="font-semibold">john.doe@example.com</h3>
              <p className="text-sm text-muted-foreground">Premium Member</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout} className="flex-1">
              <LogOut size={16} className="mr-2" />
              Log Out
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={20} className="text-primary" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone size={16} className="text-muted-foreground" />
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get instant alerts on your device
                  </p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-muted-foreground" />
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Backup notifications via email
                  </p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <Button variant="outline" onClick={handleTestNotification} className="w-full">
              Test Notification
            </Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={20} className="text-primary" />
            <h3 className="font-semibold">Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={20} className="text-primary" />
            <h3 className="font-semibold">Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="CZK">Czech Koruna (Kč)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/20">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 size={20} className="text-destructive" />
            <h3 className="font-semibold text-destructive">Danger Zone</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your reminders from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </div>
    </div>
  );
};

export default Settings;