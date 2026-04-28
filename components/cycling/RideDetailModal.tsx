'use client'

import type { RecentRide, RideBenchmarks, RideHistory } from '@/lib/cycling'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ArrowUpRight, X } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { RideDetailContent, RideRouteSvg, SOURCE_LABELS } from './RideDetailContent'

interface RideDetailModalProps {
  ride: RecentRide | null
  benchmarks: RideBenchmarks
  history: RideHistory
  virtualBenchmarks: RideBenchmarks
  virtualHistory: RideHistory
  open: boolean
  onClose: () => void
}

export function RideDetailModal({
  ride,
  benchmarks,
  history,
  virtualBenchmarks,
  virtualHistory,
  open,
  onClose,
}: RideDetailModalProps) {
  const isVirtual = ride?.sportType === 'VirtualRide'
  const activeBenchmarks = isVirtual ? virtualBenchmarks : benchmarks
  const activeHistory = isVirtual ? virtualHistory : history
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 dark:bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
          <div className="flex min-h-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <DialogPanel className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
                {ride && (
                  <ModalShell
                    ride={ride}
                    benchmarks={activeBenchmarks}
                    history={activeHistory}
                    onClose={onClose}
                  />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

function ModalShell({
  ride,
  benchmarks,
  history,
  onClose,
}: {
  ride: RecentRide
  benchmarks: RideBenchmarks
  history: RideHistory
  onClose: () => void
}) {
  const sourceLabel = SOURCE_LABELS[ride.source] ?? ride.source

  return (
    <>
      {ride.routePath && (
        <div className="relative flex items-center justify-center overflow-hidden bg-gray-50 py-4 dark:bg-gray-800/50">
          <RideRouteSvg
            path={ride.routePath}
            className="text-primary-400/60 dark:text-primary-500/40 h-32 w-full max-w-xs"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-lg bg-white/80 p-1.5 text-gray-400 backdrop-blur-sm transition-colors hover:text-gray-600 dark:bg-gray-900/80 dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="Close ride details"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-2">
        <div className="min-w-0">
          <DialogTitle className="truncate text-lg font-bold text-gray-900 dark:text-gray-100">
            {ride.name}
          </DialogTitle>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {ride.date} · {sourceLabel}
          </p>
        </div>
        {!ride.routePath && (
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-label="Close ride details"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="px-5 pb-5">
        <RideDetailContent ride={ride} benchmarks={benchmarks} history={history} />

        <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
          <Link
            href={`/cycling/${ride.slug}`}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View activity
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </>
  )
}
