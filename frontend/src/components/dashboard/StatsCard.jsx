import { motion } from "framer-motion";

export default function StatsCard({
  icon,
  title,
  value,
  change,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    violet: "bg-violet-500/10 text-violet-600",
    orange: "bg-orange-500/10 text-orange-600",
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group rounded-3xl border bg-card p-6 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {value}
          </h2>

          <p className="mt-2 text-sm font-medium text-emerald-600">
            {change}
          </p>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">

        <div
          className="h-full rounded-full bg-violet-600 transition-all group-hover:w-full"
          style={{
            width: "70%",
          }}
        />

      </div>

    </motion.div>
  );
}