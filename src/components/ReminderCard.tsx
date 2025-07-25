import { Clock, TrendingDown, ExternalLink, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ReminderCardProps {
  id: string;
  title: string;
  imageUrl: string;
  currentPrice: number;
  originalPrice?: number;
  currency: string;
  reminderType: "time" | "price";
  status: "active" | "triggered" | "cancelled";
  triggerDate?: string;
  targetPrice?: number;
  priceChange?: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenStore: (id: string) => void;
}

const ReminderCard = ({
  id,
  title,
  imageUrl,
  currentPrice,
  originalPrice,
  currency,
  reminderType,
  status,
  triggerDate,
  targetPrice,
  priceChange,
  onEdit,
  onDelete,
  onOpenStore,
}: ReminderCardProps) => {
  const formatPrice = (price: number) => `${price.toFixed(2)} ${currency}`;
  
  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-reminder-active/10 text-reminder-active border-reminder-active/20">
            Active
          </Badge>
        );
      case "triggered":
        return (
          <Badge variant="outline" className="bg-reminder-triggered/10 text-reminder-triggered border-reminder-triggered/20">
            Triggered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-reminder-cancelled/10 text-reminder-cancelled border-reminder-cancelled/20">
            Cancelled
          </Badge>
        );
    }
  };

  const getReminderTypeBadge = () => {
    if (reminderType === "time") {
      return (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Clock size={12} className="mr-1" />
          Timer
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
          <TrendingDown size={12} className="mr-1" />
          Price
        </Badge>
      );
    }
  };

  const shouldShowPriceChange = originalPrice && priceChange !== undefined;

  return (
    <Card className="p-4 transition-all duration-300 hover:shadow-lg group">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover bg-muted"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+";
            }}
          />
          {status === "triggered" && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm leading-5 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(id)}>
                  Edit reminder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpenStore(id)}>
                  <ExternalLink size={14} className="mr-2" />
                  Open store
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(id)}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Price and badges */}
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground">
                {formatPrice(currentPrice)}
              </span>
              
              {shouldShowPriceChange && (
                <span className={cn(
                  "text-xs font-medium",
                  priceChange! > 0 ? "text-price-up" : "text-price-down"
                )}>
                  {priceChange! > 0 ? "+" : ""}{priceChange!.toFixed(2)} {currency}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {getReminderTypeBadge()}
              {getStatusBadge()}
            </div>

            {/* Additional info based on reminder type */}
            {reminderType === "time" && triggerDate && (
              <p className="text-xs text-muted-foreground">
                Remind me on {new Date(triggerDate).toLocaleDateString()}
              </p>
            )}
            
            {reminderType === "price" && targetPrice && (
              <p className="text-xs text-muted-foreground">
                Target: {formatPrice(targetPrice)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReminderCard;