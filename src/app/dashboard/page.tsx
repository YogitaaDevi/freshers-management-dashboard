import React from 'react';
import CreateAssessCard from './CreateAssessCard';
import GraphCard from './GraphCard';
import FreshersListCard from './FreshersListCard';
import AssessmentListCard from './AssessmentListCard';
import Layout from '@/components/Layout';
import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';

interface TableRow {
  trainee: string;
  scores: Record<string, number>;
  total: number;
  assignedBy: string;
}

function getUniqueTopics(results: any[]): string[] {
  const topicSet = new Set<string>();
  results.forEach((r) => {
    if (r.assessment?.topic) topicSet.add(r.assessment.topic);
  });
  return Array.from(topicSet);
}

function groupResultsByTrainee(results: any[], topics: string[]): TableRow[] {
  const traineeMap = new Map<string, TableRow>();
  results.forEach((result) => {
    const traineeName = result.employee?.name || '-';
    if (!traineeMap.has(traineeName)) {
      traineeMap.set(traineeName, {
        trainee: traineeName,
        scores: {},
        total: 0,
        assignedBy: '-',
      });
    }
    const traineeObj = traineeMap.get(traineeName)!;
    const topic = result.assessment?.topic;
    if (topic) {
      if (
        !(topic in traineeObj.scores) ||
        (typeof result.overallScore === 'number' && result.overallScore > traineeObj.scores[topic])
      ) {
        traineeObj.scores[topic] = result.overallScore;
      }
    }
  });
  traineeMap.forEach((obj) => {
    obj.total = topics.reduce((sum: number, topic: string) => sum + (obj.scores[topic] || 0), 0);
  });
  return Array.from(traineeMap.values());
}

async function getAssessmentResults(): Promise<any[]> {
  const results = await prisma.assessmentResult.findMany({
    include: {
      employee: { select: { name: true } },
      assessment: { select: { topic: true, date: true } },
      parameter: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return results.map((r) => ({
    ...r,
    assessment: {
      ...r.assessment,
      date: r.assessment?.date ? r.assessment.date.toISOString() : undefined,
    },
  }));
}

export default async function DashboardPage() {
  const results = await getAssessmentResults();
  const topics = getUniqueTopics(results);
  const tableData = groupResultsByTrainee(results, topics);
  tableData.sort((a, b) => b.total - a.total);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <DashboardClient tableData={tableData} topics={topics} results={results} />
          {/* Leadership Board Section */}
          <section className="mb-10">
            <AssessmentListCard results={tableData} topics={topics} />
          </section>
          {/* Cards Section */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <CreateAssessCard />
              <GraphCard />
              <FreshersListCard />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
