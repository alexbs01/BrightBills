import Pkg;
Pkg.add("DelimitedFiles");

using DelimitedFiles;

dataset = readdlm("datasets/electrodatos.csv", ','); # Import the dataset

# Split the dataset into inputs and outputs
# The [] is used to select [rows, columns], : is used to select all rows or columns
rows, columns = size(dataset);

input = dataset[2:end, 1:6];

writedlm("datasets/cleanDataset.csv", input, ','); # Save the input dataset