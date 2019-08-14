export interface MixedChartData {
    labels: string[];
    dataset_labels: {
        series1_label: string,
        series2_label: string,
    };
    datasets: {
        series1: number[],
        series2: number[]
    };
}
