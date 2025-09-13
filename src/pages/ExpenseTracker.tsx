import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  IndianRupee, 
  PieChart, 
  TrendingUp,
  Plane,
  Hotel,
  Utensils,
  Car,
  ShoppingBag,
  MapPin,
  Calendar,
  Download,
  Target
} from "lucide-react";

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
  location: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      category: "Transport",
      amount: 4500,
      description: "Flight Delhi to Mumbai",
      date: "2024-01-15",
      location: "Delhi"
    },
    {
      id: 2,
      category: "Accommodation",
      amount: 3200,
      description: "Hotel booking - 2 nights",
      date: "2024-01-15",
      location: "Mumbai"
    },
    {
      id: 3,
      category: "Food",
      amount: 850,
      description: "Dinner at local restaurant",
      date: "2024-01-15",
      location: "Mumbai"
    },
    {
      id: 4,
      category: "Transport",
      amount: 180,
      description: "Airport to hotel cab",
      date: "2024-01-15",
      location: "Mumbai"
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
    location: ""
  });

  const [budget, setBudget] = useState({
    total: 25000,
    transport: 8000,
    accommodation: 10000,
    food: 5000,
    shopping: 2000
  });

  const categories = [
    { name: "Transport", icon: Plane, color: "text-blue-500" },
    { name: "Accommodation", icon: Hotel, color: "text-green-500" },
    { name: "Food", icon: Utensils, color: "text-orange-500" },
    { name: "Shopping", icon: ShoppingBag, color: "text-purple-500" },
    { name: "Local Transport", icon: Car, color: "text-yellow-500" }
  ];

  const addExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.description) {
      const expense: Expense = {
        id: expenses.length + 1,
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        description: newExpense.description,
        date: newExpense.date || new Date().toISOString().split('T')[0],
        location: newExpense.location
      };
      setExpenses([...expenses, expense]);
      setNewExpense({
        category: "",
        amount: "",
        description: "",
        date: "",
        location: ""
      });
    }
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    return categoryTotals;
  };

  const getBudgetStatus = () => {
    const categoryTotals = getExpensesByCategory();
    const total = getTotalExpenses();
    const remaining = budget.total - total;
    const percentUsed = (total / budget.total) * 100;
    
    return {
      total,
      remaining,
      percentUsed: Math.min(percentUsed, 100)
    };
  };

  const budgetStatus = getBudgetStatus();
  const categoryTotals = getExpensesByCategory();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold hero-text mb-2">Expense Tracker</h1>
          <p className="text-lg text-muted-foreground">Track and manage your travel expenses</p>
        </div>

        {/* Budget Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="travel-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Total Budget</span>
              </div>
              <div className="text-2xl font-bold text-primary flex items-center">
                <IndianRupee className="w-6 h-6" />
                {budget.total.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="travel-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium">Spent</span>
              </div>
              <div className="text-2xl font-bold text-red-500 flex items-center">
                <IndianRupee className="w-6 h-6" />
                {budgetStatus.total.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="travel-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Remaining</span>
              </div>
              <div className="text-2xl font-bold text-green-500 flex items-center">
                <IndianRupee className="w-6 h-6" />
                {budgetStatus.remaining.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="travel-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Usage</span>
              </div>
              <div className="text-2xl font-bold text-accent">
                {budgetStatus.percentUsed.toFixed(1)}%
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all"
                  style={{ width: `${budgetStatus.percentUsed}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="add-expense">Add Expense</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Expenses List */}
          <TabsContent value="expenses">
            <Card className="travel-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Expenses
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => {
                    const categoryIcon = categories.find(c => c.name === expense.category)?.icon || ShoppingBag;
                    const categoryColor = categories.find(c => c.name === expense.category)?.color || "text-gray-500";
                    const Icon = categoryIcon;
                    
                    return (
                      <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${categoryColor}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{expense.description}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{expense.category}</Badge>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {expense.date}
                              </div>
                              {expense.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {expense.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-primary flex items-center">
                          <IndianRupee className="w-4 h-4" />
                          {expense.amount.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Expense */}
          <TabsContent value="add-expense">
            <Card className="travel-shadow">
              <CardHeader>
                <CardTitle>Add New Expense</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            <div className="flex items-center gap-2">
                              <category.icon className={`w-4 h-4 ${category.color}`} />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What did you spend on?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Where was this expense?"
                      value={newExpense.location}
                      onChange={(e) => setNewExpense({...newExpense, location: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={addExpense} className="travel-gradient-primary text-white w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="travel-shadow">
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const amount = categoryTotals[category.name] || 0;
                      const budgetAmount = budget[category.name.toLowerCase() as keyof typeof budget] || 0;
                      const percentage = budgetAmount > 0 ? (amount / budgetAmount) * 100 : 0;
                      
                      return (
                        <div key={category.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <category.icon className={`w-4 h-4 ${category.color}`} />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                ₹{amount.toLocaleString()} / ₹{budgetAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="travel-shadow">
                <CardHeader>
                  <CardTitle>Spending Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Daily Average</h4>
                    <div className="text-2xl font-bold text-primary flex items-center justify-center">
                      <IndianRupee className="w-5 h-5" />
                      {(getTotalExpenses() / 7).toFixed(0)}
                    </div>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Top Categories</h4>
                    {Object.entries(categoryTotals)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([category, amount]) => {
                        const categoryInfo = categories.find(c => c.name === category);
                        const Icon = categoryInfo?.icon || ShoppingBag;
                        const color = categoryInfo?.color || "text-gray-500";
                        
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${color}`} />
                              <span>{category}</span>
                            </div>
                            <span className="font-medium">₹{amount.toLocaleString()}</span>
                          </div>
                        );
                      })}
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                    <h4 className="font-semibold text-primary mb-1">Budget Status</h4>
                    <p className="text-sm">
                      {budgetStatus.remaining > 0 
                        ? `You have ₹${budgetStatus.remaining.toLocaleString()} left in your budget`
                        : `You've exceeded your budget by ₹${Math.abs(budgetStatus.remaining).toLocaleString()}`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpenseTracker;