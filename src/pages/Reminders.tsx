import { useState } from "react";
import { Plus, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReminderCard from "@/components/ReminderCard";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockReminders = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB Natural Titanium",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
    currentPrice: 1399.99,
    originalPrice: 1499.99,
    currency: "€",
    reminderType: "price" as const,
    status: "triggered" as const,
    targetPrice: 1350.00,
    priceChange: -100.00,
  },
  {
    id: "2",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop",
    currentPrice: 279.99,
    originalPrice: 299.99,
    currency: "€",
    reminderType: "time" as const,
    status: "active" as const,
    triggerDate: "2025-08-15",
    priceChange: -20.00,
  },
  {
    id: "3",
    title: "MacBook Pro 14-inch M3 Pro chip with 18GB memory",
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop",
    currentPrice: 2499.99,
    currency: "€",
    reminderType: "price" as const,
    status: "active" as const,
    targetPrice: 2200.00,
  },
];

const Reminders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [reminders, setReminders] = useState(mockReminders);

  const filteredReminders = reminders.filter((reminder) =>
    reminder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: string) => {
    console.log("Edit reminder:", id);
    // TODO: Navigate to edit page
  };

  const handleDelete = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleOpenStore = (id: string) => {
    console.log("Open store for:", id);
    // TODO: Open external link
  };

  const isEmpty = filteredReminders.length === 0;

  return (
    <div className="min-h-screen bg-background md:pl-64">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Reminders</h1>
              <p className="text-sm text-muted-foreground">
                {reminders.length} reminders tracking
              </p>
            </div>
            <Button 
              onClick={() => navigate("/add")}
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              <Plus size={16} className="mr-2" />
              Add
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reminders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Clock size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? "No matching reminders" : "No reminders yet"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {searchQuery 
                ? "Try adjusting your search terms" 
                : "Start by adding your first product reminder to track prices or get notified at the right time"
              }
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => navigate("/add")}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Reminder
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                {...reminder}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onOpenStore={handleOpenStore}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;