import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Clock, TrendingDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock supported sites
const supportedSites = [
  "amazon.com", "amazon.de", "amazon.co.uk", "amazon.fr",
  "ebay.com", "ebay.de", "alza.cz", "mall.cz"
];

const AddReminder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"url" | "configure">("url");
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);
  const [reminderType, setReminderType] = useState<"time" | "price">("time");
  const [timeValue, setTimeValue] = useState(7);
  const [timeUnit, setTimeUnit] = useState<"days" | "weeks">("days");
  const [targetPrice, setTargetPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock product data from URL
  const [productData, setProductData] = useState<{
    title: string;
    currentPrice: number;
    currency: string;
    imageUrl: string;
  } | null>(null);

  const validateUrl = (inputUrl: string) => {
    if (!inputUrl.trim()) {
      setIsValidUrl(null);
      return;
    }

    try {
      const urlObj = new URL(inputUrl);
      const isSupported = supportedSites.some(site => 
        urlObj.hostname.includes(site) || urlObj.hostname.endsWith(site)
      );
      setIsValidUrl(isSupported);
      
      // Mock product data for demonstration
      if (isSupported) {
        setProductData({
          title: "Sample Product - High Quality Wireless Headphones",
          currentPrice: 199.99,
          currency: "€",
          imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop"
        });
        setTargetPrice("189.99");
      } else {
        setProductData(null);
      }
    } catch {
      setIsValidUrl(false);
      setProductData(null);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    validateUrl(value);
  };

  const handleNext = () => {
    if (isValidUrl && productData) {
      setStep("configure");
    }
  };

  const handleCreateReminder = async () => {
    setIsLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate back to reminders with success
    navigate("/", { state: { success: "Reminder created successfully!" } });
  };

  const getTriggerDescription = () => {
    if (reminderType === "time") {
      const date = new Date();
      date.setDate(date.getDate() + (timeUnit === "days" ? timeValue : timeValue * 7));
      return `Remind me on ${date.toLocaleDateString()}`;
    } else {
      return `Alert when price drops below ${targetPrice} ${productData?.currency}`;
    }
  };

  return (
    <div className="min-h-screen bg-background md:pl-64">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => step === "url" ? navigate("/") : setStep("url")}
              className="p-2"
            >
              <ArrowLeft size={16} />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {step === "url" ? "Add Product URL" : "Configure Reminder"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {step === "url" ? "Paste a product link from a supported store" : "Choose when to be reminded"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {step === "url" && (
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-3">
              <Label htmlFor="url">Product URL</Label>
              <div className="relative">
                <Input
                  id="url"
                  placeholder="https://amazon.de/product-link..."
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className={cn(
                    "pr-10",
                    isValidUrl === true && "border-success",
                    isValidUrl === false && "border-destructive"
                  )}
                />
                {isValidUrl !== null && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isValidUrl ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <X size={16} className="text-destructive" />
                    )}
                  </div>
                )}
              </div>
              
              {isValidUrl === false && (
                <p className="text-sm text-destructive">
                  This store is not supported yet. We support: {supportedSites.slice(0, 4).join(", ")} and more.
                </p>
              )}
            </div>

            {/* Product Preview */}
            {productData && isValidUrl && (
              <Card className="p-4 bg-gradient-to-br from-card to-muted/20">
                <div className="flex gap-3">
                  <img
                    src={productData.imageUrl}
                    alt={productData.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{productData.title}</h3>
                    <p className="text-lg font-semibold text-primary">
                      {productData.currentPrice} {productData.currency}
                    </p>
                    <Badge variant="outline" className="mt-2 bg-success/10 text-success">
                      <Check size={12} className="mr-1" />
                      Supported
                    </Badge>
                  </div>
                </div>
              </Card>
            )}

            {/* Supported Sites */}
            <div className="space-y-3">
              <Label>Supported Stores</Label>
              <div className="flex flex-wrap gap-2">
                {supportedSites.map((site) => (
                  <Badge key={site} variant="secondary" className="text-xs">
                    {site}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!isValidUrl || !productData}
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              Next
            </Button>
          </div>
        )}

        {step === "configure" && productData && (
          <div className="space-y-6">
            {/* Product Summary */}
            <Card className="p-4">
              <div className="flex gap-3">
                <img
                  src={productData.imageUrl}
                  alt={productData.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2">{productData.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Current: {productData.currentPrice} {productData.currency}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <ExternalLink size={14} />
                </Button>
              </div>
            </Card>

            {/* Reminder Type Tabs */}
            <Tabs value={reminderType} onValueChange={(value) => setReminderType(value as "time" | "price")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="time" className="flex items-center gap-2">
                  <Clock size={16} />
                  Time
                </TabsTrigger>
                <TabsTrigger value="price" className="flex items-center gap-2">
                  <TrendingDown size={16} />
                  Price
                </TabsTrigger>
              </TabsList>

              <TabsContent value="time" className="space-y-4">
                <div className="space-y-3">
                  <Label>Remind me in</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={timeValue}
                      onChange={(e) => setTimeValue(parseInt(e.target.value) || 1)}
                      className="flex-1"
                    />
                    <select
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value as "days" | "weeks")}
                      className="px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                    </select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="price" className="space-y-4">
                <div className="space-y-3">
                  <Label>Target Price ({productData.currency})</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="text-sm text-muted-foreground">
                    You'll be notified when the price drops to this amount or below
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Preview */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h4 className="font-medium mb-2">Reminder Summary</h4>
              <p className="text-sm text-muted-foreground">
                {getTriggerDescription()}
              </p>
            </Card>

            <Button
              onClick={handleCreateReminder}
              disabled={isLoading || (reminderType === "price" && !targetPrice)}
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              {isLoading ? "Creating..." : "Create Reminder"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReminder;