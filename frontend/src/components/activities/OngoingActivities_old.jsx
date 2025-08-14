import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Info, ChevronDown } from 'lucide-react';
import Header from '../shared/Header';
import Card from '../shared/Card';
import Button from '../shared/Button';
import BottomNavigation from '../shared/BottomNavigation';

const OngoingActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const activities = [
    {
      id: 1,
      title: 'Getting Birth Certificate',
      progress: 63,
      currentStage: 'Form CR01 Received',
      stages: [
        { name: 'GN submitted Form B23', completed: false, active: false },
        { name: 'Printing the new certificate', completed: false, active: false },
        { name: 'Form CR01 Received', completed: true, active: true }
      ],
      estimatedCompletion: '2025-08-07'
    },
    {
      id: 2,
      title: 'Business Registration',
      progress: 55,
      currentStage: 'Working on document proofing',
      stages: [
        { name: 'Relevant Documents Received', completed: false, active: false },
        { name: 'Sent for the final signature', completed: false, active: false },
        { name: 'Working on document proofing', completed: true, active: true }
      ],
      estimatedCompletion: '2025-08-09'
    },
    {
      id: 3,
      title: 'NIC Application',
      progress: 48,
      currentStage: 'Send Documents to district secretariat office',
      stages: [
        { name: 'DS verified the documents', completed: false, active: false },
        { name: 'Send Documents to district secretariat office', completed: true, active: true },
        { name: 'Send to the Department of registration', completed: false, active: false }
      ],
      estimatedCompletion: '2025-08-12'
    }
  ];

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProgressBar = ({ progress }) => (
    <div className="flex items-center space-x-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-600">{progress}%</span>
    </div>
  );

  const ActivityCard = ({ activity }) => (
    <Card className="mb-4 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {activity.title}
            </h3>
            <ProgressBar progress={activity.progress} />
          </div>
          <Info className="w-5 h-5 text-gray-400 ml-4 mt-1" />
        </div>

        {/* Current Stage */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800">Current Stage:</p>
          <p className="text-blue-700">{activity.currentStage}</p>
        </div>

        {/* Stage Timeline */}
        <div className="space-y-2">
          {activity.stages.map((stage, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                stage.completed 
                  ? stage.active 
                    ? 'bg-orange-500' 
                    : 'bg-gray-400'
                  : 'bg-gray-200'
              }`} />
              <p className={`text-sm ${
                stage.completed 
                  ? stage.active 
                    ? 'text-orange-600 font-medium' 
                    : 'text-gray-500'
                  : 'text-gray-400'
              }`}>
                {stage.name}
              </p>
            </div>
          ))}
        </div>

        {/* Estimated Completion */}
        <div className="text-xs text-gray-500 border-t pt-3">
          Estimated completion: {activity.estimatedCompletion}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <Header title="Ongoing Activities" showProgress={true} progressValue={63} />
        
        {/* Search and Filter */}
        <Card className="mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Activities"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
              >
                <option value="default">Order By</option>
                <option value="progress">Progress</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </Card>

        {/* Activities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredActivities.length > 0 ? (
            <div>
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ActivityCard activity={activity} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <p className="text-gray-500">No activities found matching your search.</p>
            </Card>
          )}
        </motion.div>

        {/* Action Button */}
        <div className="mt-6">
          <Button className="w-full" size="lg">
            Start New Application
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default OngoingActivities;
