
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Calendar, Code, Star } from "lucide-react";

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  filterBy: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  techFilter: string;
  onTechFilterChange: (tech: string) => void;
  availableTechs: string[];
  totalProjects: number;
  filteredCount: number;
  onClearFilters: () => void;
}

const ProjectFilters = ({
  searchTerm,
  onSearchChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
  techFilter,
  onTechFilterChange,
  availableTechs,
  totalProjects,
  filteredCount,
  onClearFilters
}: ProjectFiltersProps) => {
  const hasActiveFilters = searchTerm || filterBy !== "all" || techFilter || sortBy !== "order";

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters & Search
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by title or description..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Select value={filterBy} onValueChange={onFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="featured">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3" />
                  Featured Only
                </div>
              </SelectItem>
              <SelectItem value="unfeatured">Non-Featured</SelectItem>
              <SelectItem value="with-demo">With Live Demo</SelectItem>
              <SelectItem value="with-repo">With Repository</SelectItem>
            </SelectContent>
          </Select>

          <Select value={techFilter} onValueChange={onTechFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by tech" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Technologies</SelectItem>
              {availableTechs.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  <div className="flex items-center gap-2">
                    <Code className="w-3 h-3" />
                    {tech}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">Custom Order</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="date">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Date Created
                </div>
              </SelectItem>
              <SelectItem value="tech">Tech Count</SelectItem>
              <SelectItem value="featured">Featured First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>
              Showing {filteredCount} of {totalProjects} projects
            </span>
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span>Active filters:</span>
                {searchTerm && <Badge variant="outline">Search: "{searchTerm}"</Badge>}
                {filterBy !== "all" && <Badge variant="outline">Status: {filterBy}</Badge>}
                {techFilter && <Badge variant="outline">Tech: {techFilter}</Badge>}
                {sortBy !== "order" && <Badge variant="outline">Sort: {sortBy}</Badge>}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectFilters;
